import { get, isFunction } from "lodash";
import { IConfiguration } from "src/framework/types/configuration";

export default async function (
  expressApp,
  configuration: IConfiguration,
  customApi
) {
  let modules = configuration.builtinModules.split(",");
  modules = modules.filter((c) => c);
  modules = [...modules, ...get(configuration, "modules", [])];

  const processModule = (module) => {
    if (module && module.hasOwnProperty("restApi")) {
      const restApi = get(module, "restApi", {});
      const restApiEndpoints = get(restApi, "endpoints", []);
      restApiEndpoints.forEach((restApiEndpointsElement) => {
        customApi(expressApp, restApiEndpointsElement, module, configuration);
      });

      const expressAccess = get(
        module,
        "restApi.expressAccess",
        function () {}
      );

      expressAccess(expressApp);
    }
  };

  modules.forEach(async (element: any) => {
    let module;
    if (element.constructor === String) {
      module = require(`./../../../builtinModules/${element}/index`).default;
    } else if (element.constructor === Object || isFunction(element)) {
      if (element.constructor == Function) {
        module = await element(configuration);
      } else {
        module = element;
      }
    }
    processModule(module);
  });
}
