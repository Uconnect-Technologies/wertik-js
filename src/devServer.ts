import devHakeem from "./devServers/dev-hakeem"
import devNaveed from "./devServers/dev-naveed"
import devZeeshan from "./devServers/dev-naveed"
import devIlyas from "./devServers/dev-ilyas"
const dev = process.env.dev ?? "ilyas"

console.log(dev)
switch (dev) {
  case "hakeem":
    devHakeem()
    break
  case "ilyas":
    devIlyas()
    break

  case "naveed":
    devNaveed()
    break

  case "zeeshan":
    devZeeshan()
    break

  default:
    devIlyas()
    break
}
