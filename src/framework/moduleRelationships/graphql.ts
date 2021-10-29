import { IConfigurationCustomModule } from "../types/configuration";
import { get } from "lodash";
import {
  identityColumn,
  removeColumnsFromAccordingToSelectIgnoreFields,
} from "../helpers/index";
import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";

const processManyToManyRelationship = (relationshipInfo, key) => {
  return async (parentRow: any, args: any, context: any, info: any) => {
    let model = context.wertik.models[key];
    let parentRowValue = parentRow[identityColumn()].toString();
    let requestedFields = getRequestedFieldsFromResolverInfo(info);
    if (!parentRowValue) {
      return null;
    }
    return await model.paginate(
      {
        filters: {
          [relationshipInfo.foreignKey]: {
            _eq: parentRow[identityColumn()].toString(),
          },
        },
      },
      Object.keys(requestedFields.list)
    );
  };
};

const processOneToOneRelationship = (relationshipInfo, key) => {
  return async (parentRow: any, args: any, context: any, info: any) => {
    let requestedFields = getRequestedFieldsFromResolverInfo(info);
    let model = context.wertik.models[key];
    let parentRowValue = parentRow[relationshipInfo.sourceKey];
    if (!parentRowValue) {
      return null;
    }
    let a = await model.findOne({
      where: {
        [relationshipInfo.foreignKey]: parentRowValue,
      },
      attributes: removeColumnsFromAccordingToSelectIgnoreFields(
        Object.keys(requestedFields),
        model.selectIgnoreFields
      ),
    });
    return a;
  };
};

export const GraphQLModuleRelationMapper = (
  module: IConfigurationCustomModule
) => {
  let returnObject = {};

  let relationships = get(module, "database.relationships", null);

  if (relationships) {
    let oneToOne = get(relationships, "oneToOne", {});
    let belongsTo = get(relationships, "belongsTo", {});
    oneToOne = { ...oneToOne, ...belongsTo };
    const oneToMany = get(relationships, "oneToMany", {});
    Object.keys(oneToMany).forEach((key) => {
      const relationshipInfo = oneToMany[key];
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach((relationshipInfoItem) => {
          returnObject[relationshipInfoItem.as] = processManyToManyRelationship(
            relationshipInfoItem,
            key
          );
        });
      } else {
        returnObject[relationshipInfo.as] = processManyToManyRelationship(
          relationshipInfo,
          key
        );
      }
    });
    Object.keys(oneToOne).forEach((key) => {
      const relationshipInfo = oneToOne[key];
      if (relationshipInfo.constructor === Array) {
        relationshipInfo.forEach((relationshipInfoItem) => {
          returnObject[relationshipInfoItem.as] = processOneToOneRelationship(
            relationshipInfoItem,
            key
          );
        });
      } else {
        returnObject[relationshipInfo.as] = processOneToOneRelationship(
          relationshipInfo,
          key
        );
      }
    });
  }
  return returnObject;
};
