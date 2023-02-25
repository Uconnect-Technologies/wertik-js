import { createClient } from "redis"
import { wLog } from "../utils/log"
import { useRedisProps, WertikApp, WertikConfiguration } from "../types"

export const useRedis = (props?: useRedisProps) => {
  return async ({
    configuration,
    wertikApp,
  }: {
    configuration: WertikConfiguration
    wertikApp: WertikApp
  }) => {
    const client = createClient(props)
    await client.connect()
    client.on("error", (err) =>
      wLog(`Redis Client ${props.name} Error `, err)
    )
    wLog(`[Redis]`, `Initialized redis "${props.name}"`)
    return client
  }
}
