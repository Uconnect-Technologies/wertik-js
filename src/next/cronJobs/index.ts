import { get } from "lodash";
import nodeCron from "node-cron";
import { WertikApp } from "../types/types";
import {
  iObject,
  useCronJobsProps,
  WertikConfiguration,
} from "../types/types.v2";

export const useCronJob = (cron: useCronJobsProps) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration;
    wertikApp: WertikApp;
  }) => {
    return nodeCron.schedule(cron.expression, () => {
      get(cron, "beforeRun", () => {})(wertikApp);
      cron.handler(wertikApp);
      get(cron, "afterRun", () => {})(wertikApp);
    }) as iObject;
  };
};
