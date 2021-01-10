import { has, get } from "lodash";
import moment from "moment";
import convertFiltersIntoSequalizeObject from "../database/helpers/convertFiltersIntoSequalizeObject";
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
} from "../reporting";
import {
  IConfigurationCustomModule,
} from "../types/configuration";
import {
  removeColumnsFromAccordingToSelectIgnoreFields,
} from "../helpers/index";

export default function (props) {
  return {
    // properties
    identityColumn: "id",
    tableName: props.tableName,
    dbTables: props.dbTables,
    instance: null,
    bulkInstances: [],
    affectedRows: 0,
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
    stats: async function (database, requestedReports) {
      requestedReports = Object.keys(requestedReports);
      return new Promise(async (resolve, reject) => {
        let statsInfo = {
          total_count: null,
          total_created_today: null,
          total_created_this_week: null,
          total_created_last_7_days: null,
          total_created_this_month: null,
          total_created_last_month: null,
          total_created_last_90_days: null,
          total_created_last_year: null,
          total_created_this_year: null,
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
          let selectOptions = {
            type: database.QueryTypes.SELECT,
          };
          if (requestedReports.includes("total_count")) {
            count = await database.query(
              `select count(*) as total_count from ${model.getTableName()}`,
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_last_7_days")) {
            countLast7Days = await database.query(
              getQueryForLast7Days(model.getTableName()),
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_today")) {
            countToday = await database.query(
              getQueryForToday(model.getTableName()),
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_last_year")) {
            countLastYear = await database.query(
              getQueryForLastYear(model.getTableName()),
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_this_year")) {
            countThisYear = await database.query(
              getQueryForThisYear(model.getTableName()),
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_this_month")) {
            countThisMonth = await database.query(
              getQueryForThisMonth(model.getTableName()),
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_this_week")) {
            countThisweek = await database.query(
              getQueryForThisWeek(model.getTableName()),
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_last_month")) {
            countLastMonth = await database.query(
              getQueryForLastMonth(model.getTableName()),
              selectOptions
            );
          }
          if (requestedReports.includes("total_created_last_90_days")) {
            countLast90Days = await database.query(
              getQueryForLast90Days(model.getTableName()),
              selectOptions
            );
          }

          statsInfo.total_count = get(count, "[0].total_count", 0);
          statsInfo.total_created_this_month = get(
            countThisMonth,
            "[0].total_created_this_month",
            0
          );
          statsInfo.total_created_this_week = get(
            countThisweek,
            "[0].total_created_this_week",
            0
          );
          statsInfo.total_created_last_7_days = get(
            countLast7Days,
            "[0].total_created_last_7_days",
            0
          );
          statsInfo.total_created_today = get(
            countToday,
            "[0].total_created_today",
            0
          );
          statsInfo.total_created_last_month = get(
            countLastMonth,
            "[0].total_created_last_month",
            0
          );
          statsInfo.total_created_last_90_days = get(
            countLast90Days,
            "[0].total_created_last_90_days",
            0
          );
          statsInfo.total_created_last_year = get(
            countLastYear,
            "[0].total_created_last_year",
            0
          );
          statsInfo.total_created_this_year = get(
            countThisYear,
            "[0].total_created_this_year",
            0
          );

          resolve(statsInfo);
        } catch (e) {
          reject(e);
        }
      });
    },
    save: async function (args) {
      return has(args, "id")
        ? await this.update(args)
        : await this.create(args);
    },
    update: async function (args) {
      return new Promise(async (resolve, reject) => {
        try {
          const model = this.dbTables[this.tableName];
          let instance = null;
          let _this = this;
            if (this.instance) {
              instance = await this.instance.update(args);
            } else {
              this.instance = await model.findOne({
                where: { id: args.id },
              });
              if (this.instance) {
                this.instance = await this.instance.update(args);
              } else {
                throw internalServerError({
                  message: "Instance not found to update.",
                });
              }
            }
            resolve(this);
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
              await this.instance.destroy();
          } else {
            await model.destroy({
              where: args,
            });
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
          this.instance = await model.create(args);
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
          let filters = get(args, "filters", {});
          const model = this.dbTables[this.tableName];
          let sorting = get(args, "sorting", []);
          // return paginate(model, args, requestedFields);
          let baseFields: any = "*";
          let attributesObject = {};

          if (requestedFields && requestedFields.constructor === Array) {
            baseFields = requestedFields;
            attributesObject["attributes"] = baseFields;
          }

          attributesObject = removeColumnsFromAccordingToSelectIgnoreFields(
            attributesObject,
            wertikModule.database.selectIgnoreFields
          );

          let sortingObject = {
            order: sorting.map((c) => {
              return [c.column, c.type];
            }),
          };

          let convertedFilters = await convertFiltersIntoSequalizeObject(
            filters
          );
          let offset = limit * (page - 1);
          let list: any = {};
          if (baseFields == "*") {
            delete attributesObject["attributes"];
          }
          if (sorting.length == 0) {
            delete sortingObject["sorting"];
          }
          list = await model.findAndCountAll({
            offset: offset,
            limit: limit,
            where: convertedFilters,
            ...attributesObject,
            ...sortingObject,
          });

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
          _this.affectedRows = 0;
          const model = _this.dbTables[_this.tableName];
          const updated = [];
          await Promise.all(
            args.map(async (c) => {
              await model.update(c, {
                where: { id: c.id },
              });
              updated.push(await model.findOne({ where: { id: c.id } }));
              _this.affectedRows = _this.affectedRows + 1;
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
          await model.destroy({
            where: {
              id: args.map((c) => c.id),
            },
          });
          resolve({
            message: "Items deleted",
            statusCode: 200,
          });
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
          _this.bulkInstances = await model.bulkCreate(args);
          _this.affectedRows = _this.bulkInstances.length;
          resolve(_this);
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
              whr = await convertFiltersIntoSequalizeObject(args);
            } else {
              whr = {};
            }
          } else {
            whr = args;
          }
          const model = this.dbTables[this.tableName];
          let attributesObject: any = {};
          if (
            requestedFields &&
            requestedFields.constructor === Array &&
            requestedFields[0] !== "*"
          ) {
            attributesObject["attributes"] = requestedFields;
            attributesObject = removeColumnsFromAccordingToSelectIgnoreFields(
              attributesObject,
              wertikModule.database.selectIgnoreFields
            );
          }

          if (!attributesObject) {
            attributesObject = {};
          }

          if (
            attributesObject &&
            attributesObject.attributes &&
            attributesObject.attributes.length === 0
          ) {
            delete attributesObject["attributes"];
          }

          this.instance = await model.findOne({
            where: whr,
            ...attributesObject,
          });
          resolve(this);
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
