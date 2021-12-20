import { createClient } from "redis"
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
      console.log(`Redis Client ${props.name} Error `, err)
    )
    console.log(`[Redis]`, `Initialized redis "${props.name}"`)
    return client
  }
}
