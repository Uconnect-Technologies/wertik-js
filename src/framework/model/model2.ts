import actions from "./actions/index";
import {get} from "lodash";
import { throws } from "assert";
import internalServerError from "./../../framework/helpers/internalServerError";
const { create, update, destroy, findOne, view, paginate } = actions;

export default function (props) {
  return {
    tableName: props.tableName,
    dbTables: props.dbTables,
    instance: null,
    id: null,
    update: async function (args) {
      let instance = null;
      // console.log(this.instance.constructor);
      if (this.instance) {
        instance = await this.instance.update(args);
      }else {
        this.instance = await this.dbTables[this.tableName].findOne({
          where: {id: args.id}
        });
        if (this.instance) {
          this.instance = await this.instance.update(args);
        }else {
          internalServerError({message: "Instance not found"})
        }
      }
      return this;
    },
    delete: async function (args){
      if (this.instance) {
        await this.instance.destroy();
        return true;
      }else {
        await this.dbTables[this.tableName].destroy({
          where: args
        });
        return true;
      }
    },
    paginate: async function (args: any, requestedFields: any) {
      const model = this.dbTables[this.tableName];
      return paginate(model, args, requestedFields);
    },
    create: async function (args) {
      this.instance = await this.dbTables[this.tableName].create(args);
      return this
    },
    view: async function (args,requestedFields) {
      this.instance = await this.dbTables[this.tableName].findOne({
        where: args
      });
      return this;
    },
    findOneByArgs: async function (args) {
      this.response = await this.dbTables[this.tableName].findOne({
        where: args
      });
      return this;
    },
    findOneById: async function (id: Number) {
      this.response = await this.dbTables[this.tableName].findOne({
        where: {id: id}
      });
      return this;
    },
    bulkUpdate: async function () {},
    bulkDelete: async function () {
      await this.dbTables[this.tableName].destory({
        where: {
          id: args
        }
      });
      return true;
    },
    bulkCreate: async function (args) {
      this.instance = await this.dbTables[this.tableName].bulkCreate(args);
      return this;
    }
  }
}