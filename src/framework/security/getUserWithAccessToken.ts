let { get } = require("lodash");
export default async function(UserModel: any, token: string) {
  let find = await UserModel.findOneByArgs({ accessToken: token });
  return get(find, "instance", null);
}
