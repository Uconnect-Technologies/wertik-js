import { errorMessage } from "../logger/consoleMessages"
export function checkIfPackageIsInstalled(packageName: String) {
  try {
    let version = require(`${packageName}/package.json`).version
    return version
  } catch (e) {
    return false
  }
}

export function check(name: String) {
  const isInstalled = checkIfPackageIsInstalled(name)
  if (isInstalled) {
    return true
  } else {
    errorMessage(name + " is not installed, Exiting wertik-js process.")
    process.exit()
  }
}
