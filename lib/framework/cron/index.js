"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const lodash_1 = require("lodash");
function default_1(configuration, context) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let configurationCron = configuration.cron;
        configurationCron.cronList.forEach((cronItem) => {
            let initializedEvent = lodash_1.get(cronItem, "events.initialized", () => { });
            let cronItemOptions = lodash_1.get(cronItem, "options", {});
            let cronItemExpression = lodash_1.get(cronItem, "expression", {});
            let handler = lodash_1.get(cronItem, "function", () => { });
            if (node_cron_1.default.validate(cronItem.expression)) {
                let cronScheduleItem = node_cron_1.default.schedule(cronItemExpression, () => {
                    handler(context);
                }, cronItemOptions);
                initializedEvent(cronScheduleItem);
            }
            else {
                console.log(`Wrong expression: ${cronItem.expression}`);
            }
        });
    }));
}
exports.default = default_1;
//# sourceMappingURL=index.js.map