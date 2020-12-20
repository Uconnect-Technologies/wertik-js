import { IConfigurationCustomModule } from "../types/configuration";
import { get } from "lodash";
import { identityColumn, removeColumnsFromAccordingToSelectIgnoreFields } from "../helpers/index";
import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";

const processManyToManyRelationship = (relationshipInfo, key) => {
  return async (parentRow: any, args: any, context: any, info: any) => {
    let model = context.wertik.models[key]
    let parentRowValue = parentRow[identityColumn()].toString();
    let requestedFields = getRequestedFieldsFromResolverInfo(info);
    if (!parentRowValue) {
      return null;
    }
    return await model.paginate(
      {
        filters: [
          {
            column: relationshipInfo.foreignKey,
            operator: "=",
            value: parentRow[identityColumn()].toString(),
          },
        ],
      },
      Object.keys(requestedFields.list)
    );
  };
};

const processOneToOneRelationship = (relationshipInfo, key) => {
  return async (parentRow: any, args: any, context: any, info: any) => {
    let requestedFields = getRequestedFieldsFromResolverInfo(info);
    let model = context.wertik.models[key];
    let parentRowValue = parentRow[relationshipInfo.relationColumn];
    if (!parentRowValue) {
      return null;
    }
    let a = await model.findOneByArgs(
      {
        [relationshipInfo.foreignKey]: parentRowValue,
      },
      removeColumnsFromAccordingToSelectIgnoreFields(
        Object.keys(requestedFields),
        model.selectIgnoreFields
      )
    );
    return a.instance;
  };
};

export const GraphQLModuleRelationMapper = (module: IConfigurationCustomModule) => {
  let returnObject = {};

  let relationships = get(module, "database.relationships", null);

  if (relationships) {
    const oneToOne = get(relationships, "oneToOne", {});
    const oneToMany = get(relationships, "oneToMany", {});
    Object.keys(oneToMany).forEach((key) => {
      const relationshipInfo = oneToMany[key];
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach((relationshipInfoItem) => {
          returnObject[relationshipInfoItem.graphqlName] = processManyToManyRelationship(relationshipInfoItem, key);
        });
      } else {
        returnObject[relationshipInfo.graphqlName] = processManyToManyRelationship(relationshipInfo, key);
      }
    });
    Object.keys(oneToOne).forEach((key) => {
      const relationshipInfo = oneToOne[key];
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach((relationshipInfoItem) => {
          returnObject[relationshipInfoItem.graphqlName] = processOneToOneRelationship(relationshipInfoItem, key);
        });
      } else {
        returnObject[relationshipInfo.graphqlName] = processOneToOneRelationship(relationshipInfo, key);
      }
    });
  }
  return returnObject;
};
