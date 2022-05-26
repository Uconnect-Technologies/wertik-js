import { useGraphql } from "../graphql"
import wertik from "../index"

const devIlyas = async () => {
  wertik({
    port: 1200,
    graphql: useGraphql()
  })
}

export default devIlyas
