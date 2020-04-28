import { has, get } from "lodash";
import convertFiltersIntoSequalizeObject from "../database/mysql/convertFiltersIntoSequalizeObject";
import internalServerError from "../../framework/helpers/internalServerError";

export default function (props) {
  const { configuration } = props;
  return {
    tableName: props.tableName,
    dbTables: props.dbTables,
    instance: null,
    bulkInstances: [],
    id: null,
    
    getModel: function () {
      let m = this;
      m.instance = null;
      return m;
    },
    save: async function (args) {
      return has(args, "id") ? await this.update(args) : await this.create(args);
    },
    update: async function (args) {
      let instance = null;
      if (this.instance) {
        instance = await this.instance.update(args);
      } else {
        this.instance = await this.dbTables[this.tableName].findOne({
          where: { id: args.id },
        });
        if (this.instance) {
          this.instance = await this.instance.update(args);
        } else {
          throw internalServerError({ message: "Instance not found to update." });
        }
      }
      return this;
    },
    delete: async function (args) {
      if (this.instance) {
        await this.instance.destroy();
        return true;
      } else {
        await this.dbTables[this.tableName].destroy({
          where: args,
        });
        return true;
      }
    },
    paginate: async function (args: any, requestedFields: any) {
      const model = this.dbTables[this.tableName];
      // return paginate(model, args, requestedFields);
      let baseFields: any = "*";
      let attributesObject = {};

      if (requestedFields.constructor === Array) {
        baseFields = requestedFields;
        attributesObject["attributes"] = baseFields;
      }
      let sorting = get(args, "sorting", []);
      let sortingObject = {
        order: sorting.map((c) => {
          return [c.column, c.type];
        }),
      };
      let page = get(args, "pagination.page", 1);
      let limit = get(args, "pagination.limit", 10);
      let filters = get(args, "filters", []);
      let convertedFilters = await convertFiltersIntoSequalizeObject(filters);
      let offset = limit * (page - 1);
      let totalFilters = filters.length;
      let list: any = {};
      if (baseFields == "*") {
        delete attributesObject["attributes"];
      }
      if (sorting.length == 0) {
        delete sortingObject["sorting"];
      }
      if (totalFilters > 0) {
        list = await model.findAndCountAll({
          offset: offset,
          limit: limit,
          where: convertedFilters,
          ...attributesObject,
          ...sortingObject,
        });
      } else {
        list = await model.findAndCountAll({
          offset: offset,
          limit: limit,
          ...attributesObject,
          ...sortingObject,
        });
      }
      return {
        filters,
        pagination: { page, limit },
        list: list.rows,
        paginationProperties: {
          total: list.count,
          nextPage: page + 1,
          page: page,
          previousPage: page == 1 ? 1 : page - 1,
          pages: Math.ceil(list.count / limit),
        },
      };
    },
    create: async function (args) {
      this.instance = await this.dbTables[this.tableName].create(args);
      return this;
    },
    view: async function (args, requestedFields) {
      let attributesObject = {};
      if (requestedFields && requestedFields.constructor === Array && requestedFields[0] !== "*") {
        attributesObject["attributes"] = requestedFields;
      }
      this.instance = await this.dbTables[this.tableName].findOne({
        where: args,
        ...attributesObject,
      });
      return this;
    },
    findOneByArgs: async function (args, requestedFields: Array<string>) {
      let attributesObject = {};
      if (requestedFields && requestedFields.constructor === Array && requestedFields[0] !== "*") {
        attributesObject["attributes"] = requestedFields;
      }
      this.instance = await this.dbTables[this.tableName].findOne({
        where: args,
        ...attributesObject,
      });
      return this;
    },
    findOneById: async function (id: Number, requestedFields: Array<string>) {
      let attributesObject = {};
      if (requestedFields && requestedFields.constructor === Array && requestedFields[0] !== "*") {
        attributesObject["attributes"] = requestedFields;
      }
      this.instance = await this.dbTables[this.tableName].findOne({
        where: { id: id },
        ...attributesObject,
      });
      return this;
    },
    bulkUpdate: async function (args) {
      const model = this.dbTables[this.tableName];
      const updated = [];
      let instance = await Promise.all(
        args.map(async (c) => {
          let updateC = await model.update(c, {
            where: { id: c.id },
          });

          updated.push(await model.findOne({ where: { id: c.id } }));
        })
      );
      this.bulkInstances = updated;
      return this;
    },
    bulkDelete: async function (args) {
      const model = this.dbTables[this.tableName];
      await model.destroy({
        where: {
          id: args.map((c) => c),
        },
      });
      return {
        message: "Items deleted",
        statusCode: 200,
      };
    },
    bulkSoftDelete: async function (args) {
      const model = this.dbTables[this.tableName];
      await model.update(
        { isDeleted: 1 },
        {
          where: {
            id: args.map((c) => c),
          },
        }
      );
      return {
        message: "Items deleted",
        statusCode: 200,
      };
    },
    bulkCreate: async function (args) {
      this.bulkInstances = await this.dbTables[this.tableName].bulkCreate(args);
      return this;
    },
  };
}
