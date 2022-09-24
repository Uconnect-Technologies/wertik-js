import { errorMessage } from './consoleMessages'
export function checkIfPackageIsInstalled(packageName: String): boolean {
  try {
    // eslint-disable-next-line
    const version = require(`${packageName}/package.json`).version
    return version
  } catch (e) {
    return false
  }
}

export function check(name: string): boolean | undefined {
  const isInstalled = checkIfPackageIsInstalled(name)
  if (isInstalled) {
    return true
  } else {
    errorMessage(`${name}  is not installed, Exiting wertik-js process.`)
    process.exit()
  }
}
