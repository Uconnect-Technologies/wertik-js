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
