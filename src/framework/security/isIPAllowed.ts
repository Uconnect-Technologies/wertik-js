import { errorMessage } from "../logger/consoleMessages";

export default function(ip: String, ips: Array<String>, type: String, obj: any) {
  const isAllowed = ips.indexOf(ip) > -1;
  if (isAllowed) {
    return true;
  } else {
    errorMessage(`${ip} is not whitelisted, closing connection for ${ip}`);
    if (type == "express") {
      obj.res.connection.destroy();
    } else if (type == "graphql") {
      let { ApolloError } = require("apollo-server");
      throw new ApolloError(`${ip} is not whitelisted, closing connection for ${ip}`, 401, {});
    } else if (type == "ws") {
      const { ws } = obj;
      ws.send(`${ip} is not whitelisted, closing connection for ${ip}`);
      ws.close();
    }
    return false;
  }
}
