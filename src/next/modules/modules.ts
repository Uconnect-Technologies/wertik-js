import { get, isFunction } from "lodash";
import { DataTypes } from "sequelize";

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

export const useModule = (props: any) => {
  return async (wertik: any, store: any) => {
    let graphqlSchema = [];
    let inputSchema = [];
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
        // fields[element.Field] = {
        //   type: {
        //     type: element.Type,
        //     null: element.Null === "YES" ? true : false
        //   }
        // }
        console.log(type);
      });


      // graphql schema
      graphqlSchema = [`type ${props.table} {`];

      tableInformation.forEach((element) => {
        graphqlSchema.push(`${element.Field}: ${getType(element.Type)}`);
      });

      graphqlSchema.push("}");
      // graphql schema

      inputSchema = [`input ${props.table}Input {`];
      tableInformation.forEach((element) => {
        inputSchema.push(
          `${element.Field}: ${getType(element.Type)}${
            element.Null.toLowerCase() === "no" ? "!" : ""
          }`
        );
      });
      inputSchema.push("}");

      filterSchema = [`input ${props.table}Filters {`];

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
        query List${props.table} {
          list: [${props.table}]
          paginationProperties: PaginationProperties
          filters: ${props.table}Filters
        }
      `;
    }

    get(props, "on", () => {})({ useQuery, useMutation, useExpress });

    return {
      schema: graphqlSchema.join(`\n`),
      inputSchema: {
        create: inputSchema.join(`\n`).replace("id: Int!", ""),
        update: inputSchema.join(`\n`),
        list: listSchema,
        filters: filterSchema.join("\n"),
      },
    };
  };
};
