import { IConfigurationCustomModule } from "../types/configuration";
import { get } from "lodash";
import { identityColumn } from "../helpers/index";

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
  }
  return returnObject;
};

//   Object.keys(relationships).forEach((key) => {
//     let relationshipInfo = relationships[key];
//     returnObject[relationshipInfo.graphqlName] = async (parentRow: any, args: any, context: any, info: any) => {
//       let model = context.models[key].getModel();
//       if (relationshipInfo.type == "hasOne") {
//         return await model.findOneById(parentRow[identityColumn()]);
//       } else if (relationshipInfo.type == "hasMany") {
//         return await model.paginate({
//           filters: [
//             {
//               column: relationshipInfo.foreignKey,
//               operator: "=",
//               value: parentRow[identityColumn()].toString(),
//             },
//           ],
//         });
//       }
//     };
//   });
//   return returnObject;
