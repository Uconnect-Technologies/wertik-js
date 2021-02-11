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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.default = {
    name: "Mail",
    useDatabase: false,
    graphql: {
        schema: `
      type EmailResponse {
        message: String
      }
      input SendEmailInput {
        template: String!
        templateVariablesJSONStringify: String
        cc: String
        subject: String!
        to: String!
        bcc: String
      } 
    `,
        mutation: {
            schema: `
        sendEmail(input: SendEmailInput): EmailResponse
      `,
            resolvers: {
                sendEmail: (_, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        const sendEmail = context.wertik.sendEmail;
                        const template = args.input.template;
                        const variables = JSON.stringify(lodash_1.get(args, "input.templateVariablesJSONStringify", "{}"));
                        const transportVariables = {
                            cc: args.input.cc,
                            subject: args.input.subject,
                            bcc: args.input.bcc,
                            to: args.input.to,
                        };
                        yield sendEmail(template, variables, transportVariables);
                        return {
                            message: "Message Successfully",
                        };
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                }),
            },
        },
        query: {
            schema: ``,
            resolvers: {},
        },
    },
    restApi: {
        endpoints: [],
    },
};
//# sourceMappingURL=index.js.map