let { get } = require("lodash");
import getSequelizeType from "../database/mysql/getSequelizeType";
const restrictColumns = [
  "errors",
  "created_at",
  "id",
  "updated_at",
  "_id",
  "permissions",
  "assignedPermissions",
  "assignedRoles"
];
export default function(graphqlFields: any) {
  let keys = Object.keys(graphqlFields);
  let tables: any = [];
  keys.forEach(element => {
    let fields = graphqlFields[element];
    let table = {
      tableName: element,
      fields: {}
    };
    fields.forEach((fieldElement: any) => {
      let fieldName = get(fieldElement, "name.value");
      if (restrictColumns.indexOf(fieldName) == -1) {
        let type = "";
        let kind = get(fieldElement, "type.kind");
        if (kind == "NonNullType") {
          type = get(fieldElement, "type.type.name.value", "");
        } else {
          type = get(fieldElement, "type.name.value", "");
        }
        let field = {
          [fieldName]: {
            type: getSequelizeType(type),
            allowNull: kind == "NonNullType" ? false : true
          }
        };
        table.fields = { ...table.fields, ...field };
      }
    });
    tables.push(table);
  });
  return tables;
}
