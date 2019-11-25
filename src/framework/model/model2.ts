import actions from "./actions/index";
import {get} from "lodash";
const { create, update, destroy, findOne, view, paginate } = actions;

export default function (props) {
  return {
    tableName: props.tableName,
    dbTables: props.dbTables,
    update: function () {},
    delete: function (){},
    paginate: function () {},
    create: function (args) {
      console.log(this.args);
    },
    view: async function (args,requestedFields) {
      let response = await this.dbTables[this.tableName].findOne({
        where: args
      });
      return {
        ...this,
      }
    },
    findOne: function () {},
    bulkUpdate: function () {},
    bulkDelete: function () {},
    bulkCreate: function () {}
  }
}