import { createClient } from "redis"
import { wLog, wLogWithSuccess } from "../utils/log"
import { UseRedisProps, WertikApp, WertikConfiguration } from "../types"

export const useRedis = (props?: UseRedisProps) => {
  return async ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration
    wertikApp: WertikApp
  }) => {
    const client = createClient(props)
    await client.connect()
    client.on("error", (err) => wLog(`Redis Client ${props.name} Error `, err))
    wLogWithSuccess(`[Wertik-Redis]`, `Initialized redis "${props.name}"`)
    return client
  }
}
