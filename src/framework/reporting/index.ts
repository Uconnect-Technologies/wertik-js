import moment from "moment";
import { resolve } from "url";

export const getYear = () => {
  return moment().year();
};

export const getMonth = () => {
  return moment().month() + 1;
};

export const getDate = () => {
  return moment().date();
};

export const substractDays = (num) => {
  return moment().subtract(num, "d");
};

/// mysql

export const getQueryForLast7Days = function (tableName: String) {
  return `
    SELECT count(*) as total_added_last_7_days FROM ${tableName}
    WHERE DATE(created_at)
      BETWEEN
        '${getYear()}-${substractDays(7).month() + 1}-${substractDays(7).date()}'
      AND
        '${getYear()}-${moment().month() + 1}-${moment().date()}'
  `;
};

export const getQueryForToday = function (tableName: String) {
  return `
    SELECT count(*) as total_added_today FROM ${tableName}
    WHERE DATE(created_at)
      BETWEEN
        '${getYear()}-${getMonth()}-${getDate()} 00:00:00'
        AND
        '${getYear()}-${getMonth()}-${getDate()} 23:59:59'
  `;
};

export const getQueryForThisYear = function (tableName: String) {
  return `
  SELECT count(*) as total_added_this_year FROM ${tableName}
  WHERE DATE(created_at)
    BETWEEN
      '${getYear()}-1-1'
    AND
      '${getYear()}-12-31'
  `;
};

export const getQueryForThisMonth = function (tableName: String) {
  return `
    SELECT count(*) as total_added_this_month FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${getYear()}-${moment().month() + 1}-${moment().startOf("month").date()}'
    AND
      '${getYear()}-${moment().month() + 1}-${moment().endOf("month").date()}'
  `;
};

export const getQueryForThisWeek = function (tableName: String) {
  return `
    SELECT count(*) as total_added_this_week FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${getYear()}-${moment().month() + 1}-${moment().startOf("month").date()}'
    AND
      '${getYear()}-${moment().month() + 1}-${moment().endOf("month").date()}'
  `;
};

export const getQueryForLastMonth = function (tableName: String) {
  return `
    SELECT count(*) as total_added_last_month FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${moment().subtract(1, "months").year()}-${moment().subtract(1, "months").month() + 1}-${moment()
    .subtract(1, "months")
    .startOf("month")
    .date()}'
    AND
      '${moment().subtract(1, "months").year()}-${moment().subtract(1, "months").month() + 1}-${moment()
    .subtract(1, "months")
    .endOf("month")
    .date()}'
  `;
};

export const getQueryForLast90Days = function (tableName: String) {
  return `
    SELECT count(*) as total_added_last_90_days FROM ${tableName}
    WHERE DATE(created_at)
    BETWEEN
      '${moment().subtract(90, "days").year()}-${moment().subtract(90, "days").month() + 1}-${moment()
    .subtract(90, "days")
    .startOf("month")
    .date()}'
    AND
      '${moment().year()}-${moment().month() + 1}-${moment().endOf("month").date()}'
  `;
};

export const getQueryForLastYear = function (tableName: String) {
  return `
  SELECT count(*) as total_added_last_year FROM ${tableName}
  WHERE DATE(created_at)
    BETWEEN
      '${getYear() - 1}-1-1'
    AND
      '${getYear() - 1}-12-31'
  `;
};

/// mongoose

export const mongoose = {
  getTotalCount: function (model) {
    return new Promise((resolve, reject) => {
      try {
        model.count({}, function (err, count) {
          resolve(count);
        });
      } catch (e) {
        reject(e);
      }
    });
  },
};
