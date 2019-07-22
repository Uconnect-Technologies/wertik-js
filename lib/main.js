"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./framework/graphql/index"));
const index_2 = __importDefault(require("./framework/api-server/index"));
const convertConfigurationIntoEnvVariables_1 = __importDefault(require("./framework/helpers/convertConfigurationIntoEnvVariables"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
app.use(morgan_1.default('combined'));
exports.default = {
    run: function (configuration) {
        convertConfigurationIntoEnvVariables_1.default(configuration, function () {
            console.log(process.env.dialect, 1);
            index_1.default(__dirname, app);
            index_2.default(__dirname, app);
            app.listen(4000, function () {
                console.log("listening server on localhost:4000/graphql");
            });
        });
    }
};
//# sourceMappingURL=main.js.map