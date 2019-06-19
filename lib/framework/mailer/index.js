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
let nodemailer = require('nodemailer');
let handlebars = require("handlebars");
const fs_1 = __importDefault(require("fs"));
const { MAILER_SERVICE, MAILER_SERVICE_USERNAME, MAILER_SERVICE_PASSWORD } = process.env;
let transporter = nodemailer.createTransport({
    service: MAILER_SERVICE,
    auth: {
        user: MAILER_SERVICE_USERNAME,
        pass: MAILER_SERVICE_PASSWORD
    }
});
function sendEmail(templateFile, variables, credentials, useCustomTemplate, customTemplate) {
    return __awaiter(this, void 0, void 0, function* () {
        let template = null;
        if (!useCustomTemplate) {
            template = fs_1.default.readFileSync(__dirname + "/templates/" + templateFile, 'utf-8');
        }
        else {
            template = customTemplate;
        }
        let compiled = handlebars.compile(template);
        let resultTemplate = compiled(variables);
        return yield transporter.sendMail({
            from: credentials.from,
            to: credentials.to,
            html: resultTemplate,
            subject: credentials.subject
        });
    });
}
exports.sendEmail = sendEmail;
exports.default = transporter;
//# sourceMappingURL=index.js.map