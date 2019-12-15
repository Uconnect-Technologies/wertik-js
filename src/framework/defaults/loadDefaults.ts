import defaultConfiguration from "./defaultConfiguration";
import {IConfiguration} from "./../types/configuration";

export default function (configuration: IConfiguration) {
  return new Promise((resolve, reject) => {
    try {
      let configurationPassesInKeys = Object.keys(configuration);
      let newConfiguration = new Object({...defaultConfiguration});
      configurationPassesInKeys.forEach((element,index) => {
        let isLast = (index + 1) == configurationPassesInKeys.length;
        newConfiguration[element] = configuration[element];
        if (isLast) {
          resolve(newConfiguration);
        }
      });  
    } catch (err) {
      reject(err);
    }
  });
}