"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./main"));
const dev_server_configuration_1 = __importDefault(require("./dev-server-configuration"));
let a = main_1.default.run(dev_server_configuration_1.default);
a.then(app => {
    if (!app) {
        console.log("Something went wrong while running wertik.run()");
    }
    else {
        console.log("Server is up");
    }
});
//# sourceMappingURL=dev-server.js.map