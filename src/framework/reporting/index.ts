import moment from "moment";

export const getYear = () => {
  return moment().year();
};

export const getMonth = () => {};

export const getDate = () => {};

export const substractDays = (num) => {
  return moment().subtract(num, "d");
};

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
