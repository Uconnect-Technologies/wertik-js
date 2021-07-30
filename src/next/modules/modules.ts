import { get, isFunction } from "lodash";
import { DataTypes } from "sequelize";
import crud from "../crud";

export interface RelationParams {
  module: string;
  graphqlKey: string;
  database: string;
  options: {
    [key: string]: string | number | null;
  };
}

const generateDataTypeFromDescribeTableColumnType = (Type: string) => {
  let length = Type.match(/[0-9]/g)?.join("");
  let type = Type.replace(/[0-9]/g, "")
    .replace("(", "")
    .replace(")", "")
    .split(" ")[0]
    .toUpperCase();

  if (type.toLowerCase().includes("varchar")) {
    type = "STRING";
  }

  if (type.toLowerCase() === "int") {
    type = "INTEGER";
  }

  return { length, type };
};

const generateGenerateGraphQLCrud = (props, schemaInformation, store) => {
  const { graphql } = crud(props);
  const resolvers = graphql.generateCrudResolvers();

  store.graphql.typeDefs = store.graphql.typeDefs.concat(
    `\n ${schemaInformation.schema} 
    \n ${schemaInformation.inputSchema.filters}
    \n ${schemaInformation.inputSchema.create}
    \n ${schemaInformation.inputSchema.update}
    `
  );

  store.graphql.typeDefs = store.graphql.typeDefs.concat(
    `\n ${graphql.generateQueriesCrudSchema()}`
  );
  store.graphql.typeDefs = store.graphql.typeDefs.concat(
    `\n ${graphql.generateMutationsCrudSchema()}`
  );
};

export const useModule = (props: any) => {
  return async (wertik: any, store: any) => {
    let tableInstance;
    let graphqlSchema = [];
    const useDatabase = get(props, "useDatabase", false);
    const useQuery = ({ query, resolver, name }) => {
      store.graphql.typeDefs = store.graphql.typeDefs.concat(`
        extend type Query {
          ${query}
        }
      `);
      store.graphql.resolvers.Query[name] = resolver;
    };
    const useMutation = ({ query, resolver, name }) => {
      store.graphql.typeDefs = store.graphql.typeDefs.concat(`
        extend type Mutation {
          ${query}
        }
      `);
      store.graphql.resolvers.Mutation[name] = resolver;
    };

    const useExpress = (fn = (express) => {}) => {
      fn(wertik.express);
    };

    const getType = (type: string) => {
      if (
        type.includes("varchar") ||
        type.includes("timestamp") ||
        type.includes("text")
      ) {
        return `String`;
      }

      if (type.includes("int")) {
        return `Int`;
      }
    };
    let listSchema = "";
    let filterSchema = [];
    if (useDatabase) {
      var createSchema = [];
      var updateSchema = [];
      const connection = wertik.database[props.database];
      const describe = await connection.instance.query(
        `describe ${props.table}`
      );
      const tableInformation = describe[0];

      let fields = {};

      tableInformation.forEach((element) => {
        if (element.Field === "id") {
          return;
        }
        const { type, length } = generateDataTypeFromDescribeTableColumnType(
          element.Type
        );
        fields[element.Field] = {
          type: {
            type: type,
            null: element.Null === "YES" ? true : false,
          },
        };
        tableInstance = connection.instance.define(props.table, fields);
      });

      // graphql schema
      graphqlSchema = [`type ${props.name} {`];

      tableInformation.forEach((element) => {
        graphqlSchema.push(`${element.Field}: ${getType(element.Type)}`);
      });

      updateSchema = [`input update${props.name}input {`];
      tableInformation.forEach((element) => {
        updateSchema.push(
          `${element.Field}: ${getType(element.Type)}${
            element.Null.toLowerCase() === "no" ? "!" : ""
          }`
        );
      });
      updateSchema.push("}");

      createSchema = [`input create${props.name}input {`];
      tableInformation.forEach((element) => {
        if (element.Field !== "id") {
          createSchema.push(
            `${element.Field}: ${getType(element.Type)}${
              element.Null.toLowerCase() === "no" ? "!" : ""
            }`
          );
        }
      });
      createSchema.push("}");

      filterSchema = [`input ${props.name}FilterInput {`];

      tableInformation.forEach((element) => {
        if (element.Type.includes("varchar") || element.Type.includes("text")) {
          filterSchema.push(`${element.Field}: StringFilterInput`);
        } else if (
          element.Type.includes("int") ||
          element.Type.includes("number")
        ) {
          filterSchema.push(`${element.Field}: IntFilterInput`);
        }
      });

      filterSchema.push("}");

      listSchema = `
        query List${props.name} {
          list: [${props.name}]
          paginationProperties: PaginationProperties
          filters: ${props.name}Filters
        }
      `;
    }

    const hasOne = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}`);
      store.database.relationships.push({
        currentModule: props.name,
        currentModuleDatabase: props.database,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "hasOne",
      });
    };
    const belongsTo = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}`);
      store.database.relationships.push({
        currentModule: props.name,
        currentModuleDatabase: props.database,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "belongsTo",
      });
    };
    const belongsToMany = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}List`);
      store.database.relationships.push({
        currentModule: props.name,
        currentModuleDatabase: props.database,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "belongsToMany",
      });
    };
    const hasMany = (params: RelationParams) => {
      graphqlSchema.push(`${params.graphqlKey}: ${params.module}List`);
      store.database.relationships.push({
        currentModule: props.name,
        currentModuleDatabase: props.database,
        referencedModule: params.module,
        referencedModuleDatabase: params.database,
        options: params.options,
        type: "hasMany",
      });
    };

    get(props, "on", () => {})({
      useQuery,
      useMutation,
      useExpress,
      hasOne,
      belongsTo,
      belongsToMany,
      hasMany,
    });

    graphqlSchema.push("}");

    const schemaInformation = {
      tableInstance: tableInstance,
      schema: graphqlSchema.join(`\n`),
      inputSchema: {
        create: createSchema.join("\n"),
        update: updateSchema.join("\n"),
        list: listSchema,
        filters: filterSchema.join("\n"),
      },
    };

    generateGenerateGraphQLCrud(props, schemaInformation, store);

    return schemaInformation;
  };
};
