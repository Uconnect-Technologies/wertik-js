import { has, get } from "lodash";
import moment from "moment";
import convertFiltersIntoSequalizeObject from "../database/helpers/convertFiltersIntoSequalizeObject";
import convertedFiltersIntoMongooseQuery from "../database/helpers/convertedFiltersIntoMongooseQuery";
import internalServerError from "../../framework/helpers/internalServerError";
import { convertFieldsIntoSequelizeFields } from "../database/helpers";
import {
  getQueryForLast7Days,
  getQueryForLastYear,
  getQueryForThisYear,
  getQueryForThisMonth,
  getQueryForLastMonth,
  getQueryForThisWeek,
  getQueryForToday,
  getQueryForLast90Days,
  mongoose,
} from "../reporting";
import { IConfiguration, IConfigurationCustomModule } from "../types/configuration";
import { removeColumnsFromAccordingToSelectIgnoreFields } from "../helpers/index";

export default function (props) {
  const { dbDialect } = process.env;
  const isSQL = dbDialect.includes("sql");
  const isMongodb = dbDialect === "mongodb";
  return {
    // properties
    identityColumn: isSQL ? "id" : "_id",
    tableName: props.tableName,
    dbTables: props.dbTables,
    instance: null,
    bulkInstances: [],
    id: null,
    wertikModule: props.module,

    // methods

    getModel: function () {
      let m = this;
      m.instance = null;
      return m;
    },
    getSequelizeModel: function () {
      return this.dbTables[this.tableName];
    },
    getMongooseModel: function () {
      return this.dbTables[this.tableName];
    },
    stats: async function (database, requestedReports) {
      requestedReports = Object.keys(requestedReports);
      return new Promise(async (resolve, reject) => {
        let statsInfo = {
          total_count: null,
          total_added_today: null,
          total_added_this_week: null,
          total_added_last_7_days: null,
          total_added_this_month: null,
          total_added_last_month: null,
          total_added_last_90_days: null,
          total_added_last_year: null,
          total_added_this_year: null,
        };
        try {
          const model = this.dbTables[this.tableName];
          let count,
            countLast7Days,
            countToday,
            countLastYear,
            countThisYear,
            countThisMonth,
            countThisweek,
            countLastMonth,
            countLast90Days;
          if (isSQL) {
            let selectOptions = {
              type: database.QueryTypes.SELECT,
            };
            if (requestedReports.includes("total_count")) {
              count = await database.query(`select count(*) as total_count from ${model.getTableName()}`, selectOptions);
            }
            if (requestedReports.includes("total_added_last_7_days")) {
              countLast7Days = await database.query(getQueryForLast7Days(model.getTableName()), selectOptions);
            }
            if (requestedReports.includes("total_added_today")) {
              countToday = await database.query(getQueryForToday(model.getTableName()), selectOptions);
            }
            if (requestedReports.includes("total_added_last_year")) {
              countLastYear = await database.query(getQueryForLastYear(model.getTableName()), selectOptions);
            }
            if (requestedReports.includes("total_added_this_year")) {
              countThisYear = await database.query(getQueryForThisYear(model.getTableName()), selectOptions);
            }
            if (requestedReports.includes("total_added_this_month")) {
              countThisMonth = await database.query(getQueryForThisMonth(model.getTableName()), selectOptions);
            }
            if (requestedReports.includes("total_added_this_week")) {
              countThisweek = await database.query(getQueryForThisWeek(model.getTableName()), selectOptions);
            }
            if (requestedReports.includes("total_added_last_month")) {
              countLastMonth = await database.query(getQueryForLastMonth(model.getTableName()), selectOptions);
            }
            if (requestedReports.includes("total_added_last_90_days")) {
              countLast90Days = await database.query(getQueryForLast90Days(model.getTableName()), selectOptions);
            }

            statsInfo.total_count = get(count, "[0].total_count", 0);
            statsInfo.total_added_this_month = get(countThisMonth, "[0].total_added_this_month", 0);
            statsInfo.total_added_this_week = get(countThisweek, "[0].total_added_this_week", 0);
            statsInfo.total_added_last_7_days = get(countLast7Days, "[0].total_added_last_7_days", 0);
            statsInfo.total_added_today = get(countToday, "[0].total_added_today", 0);
            statsInfo.total_added_last_month = get(countLastMonth, "[0].total_added_last_month", 0);
            statsInfo.total_added_last_90_days = get(countLast90Days, "[0].total_added_last_90_days", 0);
            statsInfo.total_added_last_year = get(countLastYear, "[0].total_added_last_year", 0);
            statsInfo.total_added_this_year = get(countThisYear, "[0].total_added_this_year", 0);
          } else if (isMongodb) {
            if (requestedReports.includes("total_count")) {
              statsInfo.total_count = await mongoose.getTotalCount(model);
            }
            if (requestedReports.includes("total_added_this_week")) {
              statsInfo.total_added_this_week = await mongoose.getThisWeekCount(model);
            }
            if (requestedReports.includes("total_added_last_7_days")) {
              statsInfo.total_added_last_7_days = await mongoose.getLast7DaysCount(model);
            }
            if (requestedReports.includes("total_added_today")) {
              statsInfo.total_added_today = await mongoose.getTodayCount(model);
            }
            if (requestedReports.includes("total_added_last_month")) {
              statsInfo.total_added_last_month = await mongoose.getLastMonthCount(model);
            }
            if (requestedReports.includes("total_added_last_90_days")) {
              statsInfo.total_added_last_90_days = await mongoose.getLast90DaysCount(model);
            }
            if (requestedReports.includes("total_added_this_month")) {
              statsInfo.total_added_this_month = await mongoose.getThisMonthCount(model);
            }
            if (requestedReports.includes("total_added_this_year")) {
              statsInfo.total_added_this_year = await mongoose.getThisYearCount(model);
            }
            if (requestedReports.includes("total_added_last_year")) {
              statsInfo.total_added_last_year = await mongoose.getLastYearCount(model);
            }
          }
          resolve(statsInfo);
        } catch (e) {
          reject(e);
        }
      });
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
              await model.destroy({
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
    create: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          let model = this.dbTables[this.tableName];
          if (isSQL) {
            this.instance = await model.create(args);
          } else if (isMongodb) {
            let mongoModel = new model(args);
            await mongoModel.save();
            this.instance = mongoModel;
          }
          resolve(this);
        } catch (e) {
          reject(e);
        }
        // return this;
      });
      // return this;
    },
    paginate: async function (args: any, requestedFields: any) {
      let wertikModule: IConfigurationCustomModule = this.wertikModule;
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

            if (requestedFields && requestedFields.constructor === Array) {
              baseFields = requestedFields;
              attributesObject["attributes"] = baseFields;
            }

            attributesObject = removeColumnsFromAccordingToSelectIgnoreFields(attributesObject, wertikModule.database.selectIgnoreFields);

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

    bulkUpdate: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          let _this = this;
          const model = _this.dbTables[_this.tableName];
          const updated = [];
          await Promise.all(
            args.map(async (c) => {
              if (isSQL) {
                await model.update(c, {
                  where: { id: c.id },
                });
                updated.push(await model.findOne({ where: { id: c.id } }));
              } else if (isMongodb) {
                let update = await _this.update(c);
                updated.push(update.instance);
              }
            })
          );
          _this.bulkInstances = updated;
          // return this;
          resolve(_this);
        } catch (e) {
          reject(e);
        }
      });
    },
    bulkDelete: async function (args) {
      return new Promise(async (resolve, reject) => {
        const model = this.dbTables[this.tableName];
        try {
          if (isSQL) {
            await model.destroy({
              where: {
                id: args.map((c) => c.id),
              },
            });
            resolve({
              message: "Items deleted",
              statusCode: 200,
            });
          } else if (isMongodb) {
            model.deleteMany(
              {
                _id: {
                  $in: args.map((c) => c._id),
                },
              },
              function (err) {
                if (!err) {
                  resolve({
                    message: "Items deleted",
                    statusCode: 200,
                  });
                }
              }
            );
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    bulkSoftDelete: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          const model = this.dbTables[this.tableName];
          if (isSQL) {
            await model.update(
              { is_deleted: 1 },
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
          } else if (isMongodb) {
            await model.updateMany(
              {
                _id: {
                  $in: args.map((c) => c._id),
                },
              },
              { is_deleted: 1 }
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
        let _this = this;
        const model = this.dbTables[this.tableName];
        try {
          if (isSQL) {
            _this.bulkInstances = await model.bulkCreate(args);
            resolve(_this);
          } else if (isMongodb) {
            model.insertMany(args, function (err, docs) {
              if (!err) {
                _this.bulkInstances = docs;
                resolve(_this);
              } else {
                throw internalServerError(err);
              }
            });
          }
        } catch (e) {
          reject(e);
        }
      });
    },

    view: async function (args, requestedFields) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await this.findOneByArgs(args, requestedFields);
          resolve(res);
        } catch (e) {
          reject(e);
        }
        // return this;
      });
    },
    findOneByArgs: async function (args, requestedFields: Array<string>) {
      let wertikModule: IConfigurationCustomModule = this.wertikModule;
      return new Promise(async (resolve, reject) => {
        let whr;
        try {
          if (args && args.constructor === Array) {
            if (args.length > 0) {
              if (isSQL) {
                whr = await convertFiltersIntoSequalizeObject(args);
              } else if (isMongodb) {
                whr = await convertedFiltersIntoMongooseQuery(args);
              }
            } else {
              whr = {};
            }
          } else {
            whr = args;
          }
          const model = this.dbTables[this.tableName];
          let attributesObject: any = {};
          if (requestedFields && requestedFields.constructor === Array && requestedFields[0] !== "*") {
            if (isSQL) {
              attributesObject["attributes"] = requestedFields;
            } else if (isMongodb) {
              attributesObject["attributes"] = requestedFields.join(" ");
            }
          }
          attributesObject = removeColumnsFromAccordingToSelectIgnoreFields(attributesObject, wertikModule.database.selectIgnoreFields);

          if (attributesObject.attributes.length === 0) {
            attributesObject.attributes = ["*"];
          }

          if (isSQL) {
            this.instance = await model.findOne({
              where: whr,
              ...attributesObject,
            });
            resolve(this);
          } else if (isMongodb) {
            if (attributesObject["attributes"]) {
              this.instance = await model.findOne(whr, attributesObject["attributes"]);
            } else {
              this.instance = await model.findOne(whr);
            }
            resolve(this);
          }
        } catch (e) {
          reject(e);
        }
      });
    },
    findOneById: async function (id: any, requestedFields: Array<string>) {
      return new Promise(async (resolve, reject) => {
        try {
          let resp = await this.findOneByArgs(
            {
              [this.identityColumn]: id,
            },
            requestedFields
          );
          resolve(resp);
        } catch (e) {
          reject(e);
        }
      });
      // return this;
    },
  };
}
