import {
  getQueryForLast7Days,
  getQueryForLastYear,
  getQueryForThisYear,
  getQueryForThisMonth,
  getQueryForLastMonth,
  getQueryForThisWeek,
  getQueryForToday,
  getQueryForLast90Days,
} from "../../reporting/index";
import { get } from "lodash";

export default function (database, model) {
  return function (requestedReports) {
    return new Promise(async (resolve, reject) => {
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
      } catch (error) {
        reject(error)
      }
    })
    
  }
}