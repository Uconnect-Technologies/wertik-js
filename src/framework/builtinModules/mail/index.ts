import { get } from "lodash";
export default {
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
        sendEmail: async (_: any, args: any, context: any, info: any) => {
          try {
            const sendEmail = context.wertik.sendEmail;
            const template = args.input.template;
            const variables = JSON.stringify(
              get(args, "input.templateVariablesJSONStringify", "{}")
            );
            const transportVariables = {
              cc: args.input.cc,
              subject: args.input.subject,
              bcc: args.input.bcc,
              to: args.input.to,
            };
            await sendEmail(template, variables, transportVariables);
            return {
              message: "Message Successfully",
            };
          } catch (e) {
            throw new Error(e);
          }
        },
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
