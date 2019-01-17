import {get} from "lodash";
import getSequelizeType from "./getSequelizeType.js";
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
          allowNull: (kind == "NonNullType") ? true : false
        }
      }
      table.fields = {...table.fields,...field};
    });
    tables.push(table);
  });
  return tables;
}