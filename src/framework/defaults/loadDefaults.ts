import defaultConfiguration from "./defaultConfigurations/defaultConfiguration"
import { IConfiguration } from "./../types/configuration"

export default function (configuration: IConfiguration) {
  return new Promise((resolve, reject) => {
    try {
      let configurationPassesInKeys = Object.keys(configuration)
      if (configurationPassesInKeys.length == 0) {
        console.warn(
          "[WERTIK-JS] Configuration not passed, using default configuration."
        )
        resolve(defaultConfiguration)
      }
      let newConfiguration = new Object({ ...defaultConfiguration })
      configurationPassesInKeys.forEach((element, index) => {
        let isLast = index + 1 == configurationPassesInKeys.length
        newConfiguration[element] = configuration[element]
        if (isLast) {
          resolve(newConfiguration)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}
