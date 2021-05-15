import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { IConfiguration } from "../types/configuration";
import { get } from "lodash";

export const defaultMailerInstance = async function(configuration: IConfiguration) {
  let testAccount = await nodemailer.createTestAccount();
  const wertiknodemailerDefaultConfiguration = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  };
  let transporterConfiguration = get(configuration, "email.configuration", wertiknodemailerDefaultConfiguration);
  let transporter = nodemailer.createTransport(transporterConfiguration);
  return transporter;
};

export const sendEmail = function ({ configuration, mailerInstance, models }) {
  let databaseInstance;
  let userPassedSendEmail = get(configuration, "email.sendEmail", null);
  const saveEmailInDatabase = get(configuration, "email.saveEmailInDatabase", true);
  if (userPassedSendEmail !== null) {
    return userPassedSendEmail;
  } else {
    return async function (options) {
      let transporter = mailerInstance;
      let compiled = handlebars.compile(options.template);
      let resultTemplate = compiled(options.variables);
      try {
        let emailInstance = await transporter.sendMail({
          from: options.from,
          to: options.to,
          html: resultTemplate,
          subject: options.subject,
        });
        if (emailInstance && emailInstance.messageId) {
          console.log("Message sent: %s", emailInstance.messageId);
        }
        if (nodemailer && nodemailer.getTestMessageUrl) {
          console.log(
            "Preview URL: %s",
            nodemailer.getTestMessageUrl(emailInstance)
          );
        }
        if (saveEmailInDatabase) {
          databaseInstance = await models.Email.create({
            cc: options.cc,
            subject: options.subject,
            name: options.name,
            from_user_id: options.from_user_id,
            bcc: options.bcc,
            to: options.to,
            variables: JSON.stringify(options.variables),
            template: options.template,
            message_id: emailInstance.messageId,
          });
        }
        return { emailInstance, databaseInstance };
      } catch (e) {
        console.log(`Failed sending email: ${e.message}`);
      }
    };
  }
};

export default async function mailerInstance(configuration: IConfiguration) {
  let isDisabled = get(configuration,'email.disable', false);
  if (isDisabled === true) {
    return null;
  }
  let userPassedInstance = get(configuration, "email.defaultMailerInstance", null);
  if (userPassedInstance !== null) {
    return userPassedInstance;
  } else {
    return await defaultMailerInstance(configuration);
  }
}
