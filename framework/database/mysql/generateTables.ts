import {get} from "lodash";
import getSequelizeType from "./getSequelizeType";
const restrictColumns = [
    "errors","successMessage","successMessageType","statusCode","statusCodeNumber","created_at","id","updated_at",
    "_id","permissions","assignedPermissions","assignedRoles"
];
export default function (graphqlFields,database) {
  let keys = Object.keys(graphqlFields);
  let tables = [];
  keys.forEach(element => {
    let fields = graphqlFields[element];
    let table = {
      tableName: element,
      fields: {}
    }
    fields.forEach(fieldElement => {
      let fieldName = get(fieldElement,'name.value');
      if (restrictColumns.indexOf(fieldName) == -1) {
        let type = "";
        let kind = get(fieldElement,'type.kind');
        if (kind == "NonNullType") {
          type = get(fieldElement,'type.type.name.value','');
        }else {
          type = get(fieldElement,'type.name.value','');
        }
        let field = {
          [fieldName]: {
            type: getSequelizeType(type),
            allowNull: (kind == "NonNullType") ? false : true
          }
        }
        table.fields = {...table.fields,...field};
      }
    });
    tables.push(table);
  });
  return tables;
}