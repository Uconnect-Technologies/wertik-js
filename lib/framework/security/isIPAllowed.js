"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consoleMessages_1 = require("../logger/consoleMessages");
const lodash_1 = require("lodash");
function default_1(ip, ips, type, obj) {
    if (lodash_1.get(ips, "[0]", "") == "*") {
        return true;
    }
    const isAllowed = ips.indexOf(ip) > -1;
    if (isAllowed) {
        return true;
    }
    else {
        consoleMessages_1.errorMessage(`${ip} is not whitelisted, closing connection for ${ip}`);
        if (type == "express") {
            obj.res.connection.destroy();
        }
        else if (type == "graphql") {
            let { ApolloError } = require("apollo-server");
            throw new ApolloError(`${ip} is not whitelisted, closing connection for ${ip}`, 401, {});
        }
        else if (type == "ws") {
            const { ws } = obj;
            ws.send(`${ip} is not whitelisted, closing connection for ${ip}`);
            ws.close();
        }
        return false;
    }
}
exports.default = default_1;
//# sourceMappingURL=isIPAllowed.js.map