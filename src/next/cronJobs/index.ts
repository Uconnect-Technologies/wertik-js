import { get } from "lodash"
import nodeCron from "node-cron"
import { useCronJobsProps } from "../types/cronJobs"
import { iObject, WertikApp, WertikConfiguration } from "../types"

export const useCronJob = (cron: useCronJobsProps) => {
  return ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration
    wertikApp: WertikApp
  }) => {
    return nodeCron.schedule(cron.expression, () => {
      get(cron, "beforeRun", () => {})(wertikApp)
      cron.handler(wertikApp)
      get(cron, "afterRun", () => {})(wertikApp)
    }) as iObject
  }
}
