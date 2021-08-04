import { get } from "lodash";
import nodeCron from "node-cron";

export const useCronJob = (obj) => {
  return obj;
};

const fn = function () {};

export default function (app) {
  Object.keys(app.cronJobs).forEach((element) => {
    const cron = app.cronJobs[element];
    if (cron) {
      app.cronJobs[element] = nodeCron.schedule(cron.expression, () => {
        get(cron, "beforeRun", fn)(app);
        cron.handler(app);
        get(cron, "afterRun", fn)(app);
      });
    }
  });
}
