import { IConfigurationCustomModule } from "../types/configuration";
import { get } from "lodash";
import { identityColumn } from "../helpers/index";
import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";

export const GraphQLModuleRelationMapper = (module: IConfigurationCustomModule) => {
  let returnObject = {};

  let relationships = get(module, "database.relationships", null);

  if (relationships) {
    const oneToOne = get(relationships, "oneToOne", {});
    const oneToMany = get(relationships, "oneToMany", {});
    Object.keys(oneToMany).forEach((key) => {
      const relationshipInfo = oneToMany[key];
      returnObject[relationshipInfo.graphqlName] = async (parentRow: any, args: any, context: any, info: any) => {
        let model = context.models[key].getModel();
        return await model.paginate({
          filters: [
            {
              column: relationshipInfo.foreignKey,
              operator: "=",
              value: parentRow[identityColumn()].toString(),
            },
          ],
        });
      };
    });
    Object.keys(oneToOne).forEach((key) => {
      const relationshipInfo = oneToOne[key];
      returnObject[relationshipInfo.graphqlName] = async (parentRow: any, args: any, context: any, info: any) => {
        let requestedFields = getRequestedFieldsFromResolverInfo(info, []);
        let model = context.models[key].getModel();
        let a = await model.findOneByArgs(
          {
            [relationshipInfo.foreignKey]: parentRow[relationshipInfo.relationColumn],
          },
          Object.keys(requestedFields)
        );
        return a.instance;
      };
    });
  }
  return returnObject;
};