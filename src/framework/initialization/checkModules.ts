import { IConfiguration } from "../types/configuration";

export default function (configuration: IConfiguration) {
  const { modules } = configuration;
  return new Promise((resolve, reject) => {
    if (modules.length == 0) {
      console.log("[Wertik-js] Starting with no custom modules.");
      resolve(true);
    }
    modules.forEach((element, index) => {
      let isLast = index == modules.length - 1;
      if (!element || element.constructor !== Object) {
        console.error(
          `You have passed unsupported modules at index: ${index}, received: ${element.constructor} \n Closing process. Please see: http://www.wapgee.com/wertik-js/getting-started/custom-modules`
        );
        process.exit();
      }
      if (isLast) {
        resolve(true);
      }
    });
  });
}
