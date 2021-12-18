import wertik from "../index"
import { useRedis } from "../redis"

const devIlyas = async () => {
  wertik({
    port: 1200,
    redis: {
      testRedis: useRedis({
        name: "testRedis"
      })
    }
  })
}

export default devIlyas
