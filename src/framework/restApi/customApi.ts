import { get, kebabCase } from "lodash";
import restApiErrorResponse from "./restApiErrorResponse";
import restApiSuccessResponse from "./restApiSuccessResponse";

export default (expressApp, restApiEndpointsElement, module, configuration) => {
  const type = get(restApiEndpointsElement, "methodType", "get");
  const handler = get(restApiEndpointsElement, "handler", null);
  const onCustomApiFailure = get(
    configuration,
    "restApi.onCustomApiFailure",
    null
  );
  const path = get(restApiEndpointsElement, "path", "");
  const types = [
    "get",
    "post",
    "put",
    "delete",
    "copy",
    "head",
    "options",
    "link",
    "unlink",
    "purge",
    "lock",
    "unlock",
    "view",
  ];

  if (types.indexOf(type) > -1 && path.length > 0) {
    let apiPath = `${path}`;
    let find = "//";
    let re = new RegExp(find, "g");
    apiPath = apiPath.replace(re, "/");
    expressApp[type](apiPath, async function (req, res) {
      try {
        await handler(req, res, restApiSuccessResponse, restApiErrorResponse);
      } catch (e) {
        if (onCustomApiFailure) {
          onCustomApiFailure({
            path: apiPath,
            code: 500,
            err: e,
            res: res,
            data: {},
          });
        } else {
          restApiErrorResponse({
            path: apiPath,
            code: 500,
            err: e,
            res: res,
            data: {},
          });
        }
      }
    });
  } else {
    console.warn(
      `On module ${module.name}, Api endpoint ${path}, has undefined method type ${type}`
    );
  }
};
