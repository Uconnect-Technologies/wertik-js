import { has, get } from "lodash";
import convertFiltersIntoSequalizeObject from "../database/helpers/convertFiltersIntoSequalizeObject";
import convertedFiltersIntoMongooseQuery from "../database/helpers/convertedFiltersIntoMongooseQuery";
import internalServerError from "../../framework/helpers/internalServerError";

export default function (props) {
  const { dbDialect } = process.env;
  const { configuration } = props;
  const isSQL = dbDialect.includes("sql");
  const isMongodb = dbDialect === "mongodb";
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
      return new Promise(async (resolve, reject) => {
        try {
          const model = this.dbTables[this.tableName];
          let instance = null;
          let _this = this;
          if (isSQL) {
            if (this.instance) {
              instance = await this.instance.update(args);
            } else {
              this.instance = await model.findOne({
                where: { id: args.id },
              });
              if (this.instance) {
                this.instance = await this.instance.update(args);
              } else {
                throw internalServerError({ message: "Instance not found to update." });
              }
            }
            resolve(this);
          } else {
            await model.findOneAndUpdate(
              {
                _id: this.instance ? this.instance._id : args._id,
              },
              {
                $set: this.instance ? instance : args,
              },
              { new: true },
              function (err, doc) {
                if (err) throw internalServerError({ message: err.message });
                _this.instance = doc;
                resolve(_this);
              }
            );
          }
        } catch (e) {
          reject(e);
        }
        // return this;
      });
      // return this;
    },
    delete: async function (args) {
      return new Promise(async (resolve, reject) => {
        let model = this.dbTables[this.tableName];
        try {
          if (this.instance) {
            if (isSQL) {
              await this.instance.destroy();
            } else {
              await model.deleteOne(args);
            }
            resolve(true);
          } else {
            if (isSQL) {
              await this.dbTables[this.tableName].destroy({
                where: args,
              });
            } else {
              await model.deleteOne(args);
            }
            resolve(true);
          }
        } catch (e) {
          reject(e);
        }
        // return this;
      });
    },
    paginate: async function (args: any, requestedFields: any) {
      return new Promise(async (resolve, reject) => {
        try {
          let page = get(args, "pagination.page", 1);
          let limit = get(args, "pagination.limit", 10);
          let filters = get(args, "filters", []);
          const model = this.dbTables[this.tableName];
          let sorting = get(args, "sorting", []);
          if (isSQL) {
            // return paginate(model, args, requestedFields);
            let baseFields: any = "*";
            let attributesObject = {};

            if (requestedFields.constructor === Array) {
              baseFields = requestedFields;
              attributesObject["attributes"] = baseFields;
            }

            let sortingObject = {
              order: sorting.map((c) => {
                return [c.column, c.type];
              }),
            };

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
            resolve({
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
            });
          } else if (isMongodb) {
            let filtersQuery = convertedFiltersIntoMongooseQuery(filters);
            let sortString = sorting
              .map((c) => {
                return `${c.type == "desc" ? "-" : ""}${c.column}`;
              })
              .join(" ");
            model.paginate(
              filtersQuery,
              {
                page: page,
                limit: limit,
                sort: sortString,
              },
              function (err, result) {
                resolve({
                  list: result.docs,
                  filters,
                  pagination: { page, limit },
                  paginationProperties: {
                    total: result.totalDocs,
                    nextPage: page + 1,
                    page: page,
                    previousPage: page == 1 ? 1 : page - 1,
                    pages: Math.ceil(result.totalDocs / limit),
                  },
                });
              }
            );
          }
        } catch (e) {
          reject(e);
        }
        // return this;
      });
    },
    create: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          if (isSQL) {
            this.instance = await this.dbTables[this.tableName].create(args);
          } else if (isMongodb) {
            let model = new this.dbTables[this.tableName](args);
            await model.save();
            this.instance = model;
          }
          resolve(this);
        } catch (e) {
          reject(e);
        }
        // return this;
      });
      // return this;
    },
    view: async function (args, requestedFields) {
      return new Promise(async (resolve, reject) => {
        try {
          if (isSQL) {
            let attributesObject = {};
            if (requestedFields && requestedFields.constructor === Array && requestedFields[0] !== "*") {
              attributesObject["attributes"] = requestedFields;
            }
            this.instance = await this.dbTables[this.tableName].findOne({
              where: args,
              ...attributesObject,
            });
            resolve(this);
          } else if (isMongodb) {
            let _this = this;
            let model = this.dbTables[this.tableName];
            model.find(args).then((resp) => {
              _this.instance = resp[0];
              resolve(this);
            });
          }
        } catch (e) {
          reject(e);
        }
        // return this;
      });
    },
    findOneByArgs: async function (args, requestedFields: Array<string>) {
      return new Promise(async (resolve, reject) => {
        try {
          let attributesObject = {};
          if (requestedFields && requestedFields.constructor === Array && requestedFields[0] !== "*") {
            attributesObject["attributes"] = requestedFields;
          }
          this.instance = await this.dbTables[this.tableName].findOne({
            where: args,
            ...attributesObject,
          });
          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },
    findOneById: async function (id: Number, requestedFields: Array<string>) {
      return new Promise(async (resolve, reject) => {
        try {
          let attributesObject = {};
          if (requestedFields && requestedFields.constructor === Array && requestedFields[0] !== "*") {
            attributesObject["attributes"] = requestedFields;
          }
          this.instance = await this.dbTables[this.tableName].findOne({
            where: { id: id },
            ...attributesObject,
          });
          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
      // return this;
    },
    bulkUpdate: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          const model = this.dbTables[this.tableName];
          const updated = [];
          await Promise.all(
            args.map(async (c) => {
              let updateC = await model.update(c, {
                where: { id: c.id },
              });

              updated.push(await model.findOne({ where: { id: c.id } }));
            })
          );
          this.bulkInstances = updated;
          // return this;
          resolve(this);
        } catch (e) {
          reject(e);
        }
      });
    },
    bulkDelete: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          if (isSQL) {
            const model = this.dbTables[this.tableName];
            await model.destroy({
              where: {
                id: args.map((c) => c),
              },
            });
            resolve({
              message: "Items deleted",
              statusCode: 200,
            });
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    bulkSoftDelete: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          if (isSQL) {
            const model = this.dbTables[this.tableName];
            await model.update(
              { isDeleted: 1 },
              {
                where: {
                  id: args.map((c) => c),
                },
              }
            );
            resolve({
              message: "Items deleted",
              statusCode: 200,
            });
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    bulkCreate: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          if (isSQL) {
            this.bulkInstances = await this.dbTables[this.tableName].bulkCreate(args);
            resolve(this);
          }
        } catch (e) {
          reject(e);
        }
      });
    },
  };
}
