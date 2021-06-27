import { ConnectContactLens } from "aws-sdk";
import { graphql } from "graphql";

export const useModule = (props: any) => {
  return async (wertik: any) => {
    const connection = wertik.database[props.database];
    const query = await connection.instance.query(`describe ${props.table}`);
    const tableInformation = query[0];

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

    let graphqlSchema = [`type ${props.table} {`];

    tableInformation.forEach((element) => {
      graphqlSchema.push(`${element.Field}: ${getType(element.Type)}`);
    });

    graphqlSchema.push("}");


    return {
      schema: graphqlSchema.join(`\n`),
    };
  };
};
