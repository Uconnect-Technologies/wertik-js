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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../reporting/index");
const lodash_1 = require("lodash");
function default_1(database, model) {
    return function (requestedReports) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
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
                let count, countLast7Days, countToday, countLastYear, countThisYear, countThisMonth, countThisweek, countLastMonth, countLast90Days;
                let selectOptions = {
                    type: database.QueryTypes.SELECT,
                };
                if (requestedReports.includes("total_count")) {
                    count = yield database.query(`select count(*) as total_count from ${model.getTableName()}`, selectOptions);
                }
                if (requestedReports.includes("total_created_last_7_days")) {
                    countLast7Days = yield database.query(index_1.getQueryForLast7Days(model.getTableName()), selectOptions);
                }
                if (requestedReports.includes("total_created_today")) {
                    countToday = yield database.query(index_1.getQueryForToday(model.getTableName()), selectOptions);
                }
                if (requestedReports.includes("total_created_last_year")) {
                    countLastYear = yield database.query(index_1.getQueryForLastYear(model.getTableName()), selectOptions);
                }
                if (requestedReports.includes("total_created_this_year")) {
                    countThisYear = yield database.query(index_1.getQueryForThisYear(model.getTableName()), selectOptions);
                }
                if (requestedReports.includes("total_created_this_month")) {
                    countThisMonth = yield database.query(index_1.getQueryForThisMonth(model.getTableName()), selectOptions);
                }
                if (requestedReports.includes("total_created_this_week")) {
                    countThisweek = yield database.query(index_1.getQueryForThisWeek(model.getTableName()), selectOptions);
                }
                if (requestedReports.includes("total_created_last_month")) {
                    countLastMonth = yield database.query(index_1.getQueryForLastMonth(model.getTableName()), selectOptions);
                }
                if (requestedReports.includes("total_created_last_90_days")) {
                    countLast90Days = yield database.query(index_1.getQueryForLast90Days(model.getTableName()), selectOptions);
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
            catch (error) {
                reject(error);
            }
        }));
    };
}
exports.default = default_1;
//# sourceMappingURL=stats.js.map