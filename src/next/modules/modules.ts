import { AnyARecord } from "dns";
import { get } from "lodash";

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
    const useExpress = (fn = (express: AnyARecord) => {}) => {
      fn(wertik.express);
    };

    const connection = wertik.database[props.database];
    const describe = await connection.instance.query(`describe ${props.table}`);
    const tableInformation = describe[0];

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
    if (useDatabase) {
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
    }

    get(props, "on", () => {})({ useQuery, useMutation, useExpress });

    return {
      schema: graphqlSchema.join(`\n`),
      inputSchema: {
        create: inputSchema.join(`\n`),
      },
    };
  };
};
