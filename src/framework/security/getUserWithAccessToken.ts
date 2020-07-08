let { get } = require("lodash");
export default async function (UserModel: any, token: string) {
  try {
    let find = await UserModel.findOneByArgs({ access_token: token }, "*");
    return get(find, "instance", null);
  } catch (errorInstance) {
    let modules: any = process.env.builtinModules;
    modules = modules.split(",");
    modules = modules.filter((c) => c);
    if (modules.length == 0) {
      return null;
    } else {
      throw errorInstance;
    }
  }
}
