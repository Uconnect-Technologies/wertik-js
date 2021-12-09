import { IConfiguration } from "../types/configuration"
import cron from "node-cron"
import { get } from "lodash"

export default function (configuration: IConfiguration, context: any) {
  return new Promise(async (resolve, reject) => {
    let configurationCron = configuration.cron
    configurationCron.cronList.forEach((cronItem) => {
      let initializedEvent = get(cronItem, "events.initialized", () => {})
      let cronItemOptions = get(cronItem, "options", {})
      let cronItemExpression = get(cronItem, "expression", {})
      let handler = get(cronItem, "function", () => {})
      if (cron.validate(cronItem.expression)) {
        let cronScheduleItem = cron.schedule(
          cronItemExpression,
          () => {
            handler(context)
          },
          cronItemOptions
        )
        initializedEvent(cronScheduleItem)
      } else {
        console.log(`Wrong expression: ${cronItem.expression}`)
      }
    })
  })
}
