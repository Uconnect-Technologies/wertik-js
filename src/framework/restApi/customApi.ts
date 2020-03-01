import { get, kebabCase } from "lodash";
import restApiErrorResponse from "./restApiErrorResponse";
import restApiSuccessResponse from "./restApiSuccessResponse";

export default (expressApp, restApiEndpointsElement, module) => {
  const versionPath = "api/v1";
  const type = get(restApiEndpointsElement, "methodType", "get");
  const handler = get(restApiEndpointsElement, "handler", null);
  const path = get(restApiEndpointsElement, "path", "");
  const types = ["get", "post", "put", "delete", "copy", "head", "options", "link", "unlink", "purge", "lock", "unlock", "view"];

  if (types.indexOf(type) > -1) {
    let apiPath = `/${versionPath}/${kebabCase(module.name)}/${path}`;
    let find = "//";
    let re = new RegExp(find, "g");
    apiPath = apiPath.replace(re, "/");
    expressApp[type](apiPath, async function(req, res) {
      try {
        await handler(req, res, restApiSuccessResponse, restApiErrorResponse);
      } catch (e) {
        restApiErrorResponse({
          code: 500,
          err: e,
          res: res,
          data: {}
        });
      }
    });
  } else {
    console.warn(`On module ${module.name}, Api endpoint ${path}, has undefined method type ${type}`);
  }
};
