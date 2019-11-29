import {get,kebabCase} from "lodash";
export default (module,expressApp,url, info) => {
  const versionPath = 'api/v1';
  const type = get(info,'type','get');
  const handler = get(info,'handler',() => {});
  const types = ["get","post","put","delete","copy","head","options","link","unlink","purge","lock","unlock","view"];
  if (types.indexOf(type) > -1) {
    expressApp[type](`/${versionPath}/${kebabCase(module.name)}/${url}`,handler)
  }else {
    console.warn(`On module ${module.name}, Api endpoint ${url}, has undefined type ${type}`);
  }
}