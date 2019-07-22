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
let fs = require("fs");
let handlebars = require("handlebars");
let nodemailer = require('nodemailer');
let { join } = require('path');
const transporter_1 = __importDefault(require("./transporter"));
function sendEmail(templateFile, variables, credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = yield transporter_1.default();
        let template = null;
        template = fs.readFileSync(join(__dirname, "/../../../email-templates/", templateFile), 'utf-8');
        let compiled = handlebars.compile(template);
        let resultTemplate = compiled(variables);
        try {
            let send = yield transporter.sendMail({
                from: credentials.from,
                to: credentials.to,
                html: resultTemplate,
                subject: credentials.subject
            });
            console.log("Message sent: %s", send.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(send));
            return send;
        }
        catch (e) {
            console.log(`Failed sending email: ${e.message}`);
        }
    });
}
exports.sendEmail = sendEmail;
// export default transporter;
//# sourceMappingURL=index.js.map