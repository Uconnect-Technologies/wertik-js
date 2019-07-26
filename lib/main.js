"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const convertConfigurationIntoEnvVariables_1 = __importDefault(require("./framework/helpers/convertConfigurationIntoEnvVariables"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
app.use(morgan_1.default('combined'));
exports.default = {
    run: function (configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield convertConfigurationIntoEnvVariables_1.default(configuration);
                if (process.env.mode) {
                    let initServers = require("./initServers").default;
                    let initializedApp = yield initServers(__dirname, app);
                    return initializedApp;
                }
            }
            catch (e) {
                console.log(`Something went wrong: ${e.message}`);
            }
        });
    },
};
//# sourceMappingURL=main.js.map