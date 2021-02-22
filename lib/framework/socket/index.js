"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSocketInstance = void 0;
const lodash_1 = require("lodash");
const socket_io_1 = __importDefault(require("socket.io"));
exports.defaultSocketInstance = (sockets, context) => {
    const { disable, options, onClientConnected, middlewares } = sockets;
    if (disable === true) {
        return null;
    }
    const { httpServer, cache } = context;
    const io = socket_io_1.default(httpServer, options);
    middlewares &&
        middlewares.forEach((fn) => {
            io.use((socket, next) => {
                fn({ socket, next, context });
            });
        });
    io.on("connection", (socket) => {
        onClientConnected({
            socket,
            context,
        });
    });
    return io;
};
function default_1(options, context) {
    let ws = exports.defaultSocketInstance({
        onClientConnected: lodash_1.get(options, "sockets.onClientConnected", function () { }),
        disable: lodash_1.get(options, "sockets.disable", false),
        options: lodash_1.get(options, "sockets.options", {}),
        middlewares: lodash_1.get(options, "sockets.middlewares", []),
    }, context);
    return ws;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map