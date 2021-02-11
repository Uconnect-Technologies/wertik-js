"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const convertFiltersIntoSequalizeObject_1 = __importDefault(require("../database/helpers/convertFiltersIntoSequalizeObject"));
const internalServerError_1 = __importDefault(require("../../framework/helpers/internalServerError"));
const reporting_1 = require("../reporting");
const index_1 = require("../helpers/index");
function default_1(props) {
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
        stats: function (database, requestedReports) {
            return __awaiter(this, void 0, void 0, function* () {
                requestedReports = Object.keys(requestedReports);
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                        let count, countLast7Days, countToday, countLastYear, countThisYear, countThisMonth, countThisweek, countLastMonth, countLast90Days;
                        let selectOptions = {
                            type: database.QueryTypes.SELECT,
                        };
                        if (requestedReports.includes("total_count")) {
                            count = yield database.query(`select count(*) as total_count from ${model.getTableName()}`, selectOptions);
                        }
                        if (requestedReports.includes("total_created_last_7_days")) {
                            countLast7Days = yield database.query(reporting_1.getQueryForLast7Days(model.getTableName()), selectOptions);
                        }
                        if (requestedReports.includes("total_created_today")) {
                            countToday = yield database.query(reporting_1.getQueryForToday(model.getTableName()), selectOptions);
                        }
                        if (requestedReports.includes("total_created_last_year")) {
                            countLastYear = yield database.query(reporting_1.getQueryForLastYear(model.getTableName()), selectOptions);
                        }
                        if (requestedReports.includes("total_created_this_year")) {
                            countThisYear = yield database.query(reporting_1.getQueryForThisYear(model.getTableName()), selectOptions);
                        }
                        if (requestedReports.includes("total_created_this_month")) {
                            countThisMonth = yield database.query(reporting_1.getQueryForThisMonth(model.getTableName()), selectOptions);
                        }
                        if (requestedReports.includes("total_created_this_week")) {
                            countThisweek = yield database.query(reporting_1.getQueryForThisWeek(model.getTableName()), selectOptions);
                        }
                        if (requestedReports.includes("total_created_last_month")) {
                            countLastMonth = yield database.query(reporting_1.getQueryForLastMonth(model.getTableName()), selectOptions);
                        }
                        if (requestedReports.includes("total_created_last_90_days")) {
                            countLast90Days = yield database.query(reporting_1.getQueryForLast90Days(model.getTableName()), selectOptions);
                        }
                        statsInfo.total_count = lodash_1.get(count, "[0].total_count", 0);
                        statsInfo.total_created_this_month = lodash_1.get(countThisMonth, "[0].total_created_this_month", 0);
                        statsInfo.total_created_this_week = lodash_1.get(countThisweek, "[0].total_created_this_week", 0);
                        statsInfo.total_created_last_7_days = lodash_1.get(countLast7Days, "[0].total_created_last_7_days", 0);
                        statsInfo.total_created_today = lodash_1.get(countToday, "[0].total_created_today", 0);
                        statsInfo.total_created_last_month = lodash_1.get(countLastMonth, "[0].total_created_last_month", 0);
                        statsInfo.total_created_last_90_days = lodash_1.get(countLast90Days, "[0].total_created_last_90_days", 0);
                        statsInfo.total_created_last_year = lodash_1.get(countLastYear, "[0].total_created_last_year", 0);
                        statsInfo.total_created_this_year = lodash_1.get(countThisYear, "[0].total_created_this_year", 0);
                        resolve(statsInfo);
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            });
        },
        save: function (args) {
            return __awaiter(this, void 0, void 0, function* () {
                return lodash_1.has(args, "id")
                    ? yield this.update(args)
                    : yield this.create(args);
            });
        },
        update: function (args) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const model = this.dbTables[this.tableName];
                        let instance = null;
                        let _this = this;
                        if (this.instance) {
                            instance = yield this.instance.update(args);
                        }
                        else {
                            this.instance = yield model.findOne({
                                where: { id: args.id },
                            });
                            if (this.instance) {
                                this.instance = yield this.instance.update(args);
                            }
                            else {
                                throw internalServerError_1.default({
                                    message: "Instance not found to update.",
                                });
                            }
                        }
                        resolve(this);
                    }
                    catch (e) {
                        reject(e);
                    }
                    // return this;
                }));
                // return this;
            });
        },
        delete: function (args) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    let model = this.dbTables[this.tableName];
                    try {
                        if (this.instance) {
                            yield this.instance.destroy();
                        }
                        else {
                            yield model.destroy({
                                where: args,
                            });
                            resolve(true);
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                    // return this;
                }));
            });
        },
        create: function (args) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let model = this.dbTables[this.tableName];
                        this.instance = yield model.create(args);
                        resolve(this);
                    }
                    catch (e) {
                        reject(e);
                    }
                    // return this;
                }));
                // return this;
            });
        },
        paginate: function (args, requestedFields) {
            return __awaiter(this, void 0, void 0, function* () {
                let wertikModule = this.wertikModule;
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let page = lodash_1.get(args, "pagination.page", 1);
                        let limit = lodash_1.get(args, "pagination.limit", 10);
                        let filters = lodash_1.get(args, "filters", {});
                        const model = this.dbTables[this.tableName];
                        let sorting = lodash_1.get(args, "sorting", []);
                        // return paginate(model, args, requestedFields);
                        let baseFields = "*";
                        let attributesObject = {};
                        if (requestedFields && requestedFields.constructor === Array) {
                            baseFields = requestedFields;
                            attributesObject["attributes"] = baseFields;
                        }
                        attributesObject = index_1.removeColumnsFromAccordingToSelectIgnoreFields(attributesObject, wertikModule.database.selectIgnoreFields);
                        let sortingObject = {
                            order: sorting.map((c) => {
                                return [c.column, c.type];
                            }),
                        };
                        let convertedFilters = yield convertFiltersIntoSequalizeObject_1.default(filters);
                        let offset = limit * (page - 1);
                        let list = {};
                        if (baseFields == "*") {
                            delete attributesObject["attributes"];
                        }
                        if (sorting.length == 0) {
                            delete sortingObject["sorting"];
                        }
                        list = yield model.findAndCountAll(Object.assign(Object.assign({ offset: offset, limit: limit, where: convertedFilters }, attributesObject), sortingObject));
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
                    }
                    catch (e) {
                        reject(e);
                    }
                    // return this;
                }));
            });
        },
        bulkUpdate: function (args) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let _this = this;
                        _this.affectedRows = 0;
                        const model = _this.dbTables[_this.tableName];
                        const updated = [];
                        yield Promise.all(args.map((c) => __awaiter(this, void 0, void 0, function* () {
                            yield model.update(c, {
                                where: { id: c.id },
                            });
                            updated.push(yield model.findOne({ where: { id: c.id } }));
                            _this.affectedRows = _this.affectedRows + 1;
                        })));
                        _this.bulkInstances = updated;
                        // return this;
                        resolve(_this);
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            });
        },
        bulkDelete: function (args) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    const model = this.dbTables[this.tableName];
                    try {
                        yield model.destroy({
                            where: {
                                id: args.map((c) => c.id),
                            },
                        });
                        resolve({
                            message: "Items deleted",
                            statusCode: 200,
                        });
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            });
        },
        bulkCreate: function (args) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    let _this = this;
                    const model = this.dbTables[this.tableName];
                    try {
                        _this.bulkInstances = yield model.bulkCreate(args);
                        _this.affectedRows = _this.bulkInstances.length;
                        resolve(_this);
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            });
        },
        view: function (args, requestedFields) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let res = yield this.findOneByArgs(args, requestedFields);
                        resolve(res);
                    }
                    catch (e) {
                        reject(e);
                    }
                    // return this;
                }));
            });
        },
        findOneByArgs: function (args, requestedFields) {
            return __awaiter(this, void 0, void 0, function* () {
                let wertikModule = this.wertikModule;
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    let whr;
                    try {
                        if (args && args.constructor === Array) {
                            if (args.length > 0) {
                                whr = yield convertFiltersIntoSequalizeObject_1.default(args);
                            }
                            else {
                                whr = {};
                            }
                        }
                        else {
                            whr = args;
                        }
                        const model = this.dbTables[this.tableName];
                        let attributesObject = {};
                        if (requestedFields &&
                            requestedFields.constructor === Array &&
                            requestedFields[0] !== "*") {
                            attributesObject["attributes"] = requestedFields;
                            attributesObject = index_1.removeColumnsFromAccordingToSelectIgnoreFields(attributesObject, wertikModule.database.selectIgnoreFields);
                        }
                        if (!attributesObject) {
                            attributesObject = {};
                        }
                        if (attributesObject &&
                            attributesObject.attributes &&
                            attributesObject.attributes.length === 0) {
                            delete attributesObject["attributes"];
                        }
                        this.instance = yield model.findOne(Object.assign({ where: whr }, attributesObject));
                        resolve(this);
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            });
        },
        findOneById: function (id, requestedFields) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let resp = yield this.findOneByArgs({
                            [this.identityColumn]: id,
                        }, requestedFields);
                        resolve(resp);
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
                // return this;
            });
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=model.js.map