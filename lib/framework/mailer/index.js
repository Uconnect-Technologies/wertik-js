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
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const lodash_1 = require("lodash");
exports.defaultMailerInstance = function (configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        let testAccount = yield nodemailer_1.default.createTestAccount();
        const wertiknodemailerDefaultConfiguration = {
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        };
        let transporterConfiguration = lodash_1.get(configuration, "email.configuration", wertiknodemailerDefaultConfiguration);
        let transporter = nodemailer_1.default.createTransport(transporterConfiguration);
        return transporter;
    });
};
exports.sendEmail = function (configuration, mailerInstance) {
    let userPassedSendEmail = lodash_1.get(configuration, "email.sendEmail", null);
    if (userPassedSendEmail !== null) {
        return userPassedSendEmail;
    }
    else {
        return function (template, variables, credentials) {
            return __awaiter(this, void 0, void 0, function* () {
                let transporter = mailerInstance;
                let compiled = handlebars_1.default.compile(template);
                let resultTemplate = compiled(variables);
                try {
                    let send = yield transporter.sendMail({
                        from: credentials.from,
                        to: credentials.to,
                        html: resultTemplate,
                        subject: credentials.subject
                    });
                    if (send && send.messageId) {
                        console.log("Message sent: %s", send.messageId);
                    }
                    if (nodemailer_1.default && nodemailer_1.default.getTestMessageUrl) {
                        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(send));
                    }
                    return send;
                }
                catch (e) {
                    console.log(`Failed sending email: ${e.message}`);
                }
            });
        };
    }
};
function mailerInstance(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        let isDisabled = lodash_1.get(configuration, 'email.disable', false);
        if (isDisabled === true) {
            return null;
        }
        let userPassedInstance = lodash_1.get(configuration, "email.defaultMailerInstance", null);
        if (userPassedInstance !== null) {
            return userPassedInstance;
        }
        else {
            return yield exports.defaultMailerInstance(configuration);
        }
    });
}
exports.default = mailerInstance;
//# sourceMappingURL=index.js.map