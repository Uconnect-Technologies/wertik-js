import { get, kebabCase } from "lodash";
import {addContentsToDoc} from "./../apiDocs/index"
export default (expressApp, restApiEndpointsElement, module) => {
  const versionPath = "api/v1";
  const type = get(restApiEndpointsElement, "methodType", "get");
  const handler = get(restApiEndpointsElement, "handler", () => {});
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
    "view"
  ];
  if (types.indexOf(type) > -1) {
    let apiPath = `/${versionPath}/${kebabCase(module.name)}/${path}`;
    let find = "//";
    let re = new RegExp(find, "g");
    apiPath = apiPath.replace(re, "/");
      addContentsToDoc(`
      /**
       * @api {${type}} ${apiPath} ${get(restApiEndpointsElement.docs,'title',`Title for ${apiPath}`)}
       * @apiName ${path}
       * @apiGroup ${module.name}
       * @apiDescription ${get(restApiEndpointsElement.docs,'description','Empty Description')}
       *
       * ${get(restApiEndpointsElement,'params','')}
       *
       * ${get(restApiEndpointsElement,'response','')}
       */
    `);
    expressApp[type](apiPath, handler);
  } else {
    console.warn(`On module ${module.name}, Api endpoint ${path}, has undefined type ${type}`);
  }
};
