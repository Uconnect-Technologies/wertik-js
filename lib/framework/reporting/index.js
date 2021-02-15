"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryForLastYear = exports.getQueryForLast90Days = exports.getQueryForLastMonth = exports.getQueryForThisWeek = exports.getQueryForThisMonth = exports.getQueryForThisYear = exports.getQueryForToday = exports.getQueryForLast7Days = exports.substractDays = exports.getDate = exports.getMonth = exports.getYear = void 0;
const moment_1 = __importDefault(require("moment"));
exports.getYear = (mm = null) => {
    return mm ? mm.year() : moment_1.default().year();
};
exports.getMonth = (mm = null) => {
    return mm ? mm.month() + 1 : moment_1.default().month() + 1;
};
exports.getDate = (mm = null) => {
    return mm ? mm.date() : moment_1.default().date();
};
exports.substractDays = (num) => {
    return moment_1.default().subtract(num, "d");
};
exports.getQueryForLast7Days = function (tableName) {
    return `
    SELECT count(*) as total_created_last_7_days FROM ${tableName}
    WHERE DATE(created_at)
      BETWEEN
        '${exports.getYear(exports.substractDays(7))}-${exports.substractDays(7).month() + 1}-${exports.substractDays(7).date()}'
      AND
        '${exports.getYear(exports.substractDays(7))}-${moment_1.default().month() + 1}-${moment_1.default().date()}'
  `;
};
exports.getQueryForToday = function (tableName) {
    return `
    SELECT count(*) as total_created_today FROM ${tableName}
    WHERE DATE(created_at)
      BETWEEN
        '${exports.getYear()}-${exports.getMonth()}-${exports.getDate()} 00:00:00'
        AND
        '${exports.getYear()}-${exports.getMonth()}-${exports.getDate()} 23:59:59'
  `;
};
exports.getQueryForThisYear = function (tableName) {
    return `
  SELECT count(*) as total_created_this_year FROM ${tableName}
  WHERE DATE(created_at)
    BETWEEN
      '${exports.getYear()}-1-1'
    AND
      '${exports.getYear()}-12-31'
  `;
};
exports.getQueryForThisMonth = function (tableName) {
    return `
    SELECT count(*) as total_created_this_month FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${exports.getYear()}-${moment_1.default().month() + 1}-${moment_1.default().startOf("month").date()}'
    AND
      '${exports.getYear()}-${moment_1.default().month() + 1}-${moment_1.default().endOf("month").date()}'
  `;
};
exports.getQueryForThisWeek = function (tableName) {
    return `
    SELECT count(*) as total_created_this_week FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${exports.getYear(moment_1.default().startOf("isoWeek"))}-${moment_1.default().startOf("isoWeek").month() + 1}-${moment_1.default().startOf("isoWeek").date()}'
    AND
      '${exports.getYear(moment_1.default().endOf("isoWeek"))}-${moment_1.default().endOf("isoWeek").month() + 1}-${moment_1.default().endOf("isoWeek").date()}'
  `;
};
exports.getQueryForLastMonth = function (tableName) {
    return `
    SELECT count(*) as total_created_last_month FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${moment_1.default().subtract(1, "months").year()}-${moment_1.default().subtract(1, "months").month() + 1}-${moment_1.default()
        .subtract(1, "months")
        .startOf("month")
        .date()}'
    AND
      '${moment_1.default().subtract(1, "months").year()}-${moment_1.default().subtract(1, "months").month() + 1}-${moment_1.default()
        .subtract(1, "months")
        .endOf("month")
        .date()}'
  `;
};
exports.getQueryForLast90Days = function (tableName) {
    return `
    SELECT count(*) as total_created_last_90_days FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${moment_1.default().subtract(90, "days").year()}-${moment_1.default().subtract(90, "days").month() + 1}-${moment_1.default()
        .subtract(90, "days")
        .startOf("month")
        .date()}'
    AND
      '${moment_1.default().year()}-${moment_1.default().month() + 1}-${moment_1.default().endOf("month").date()}'
  `;
};
exports.getQueryForLastYear = function (tableName) {
    return `
  SELECT count(*) as total_created_last_year FROM ${tableName}
  WHERE DATE(created_at)
    BETWEEN
      '${exports.getYear() - 1}-1-1'
    AND
      '${exports.getYear() - 1}-12-31'
  `;
};
//# sourceMappingURL=index.js.map