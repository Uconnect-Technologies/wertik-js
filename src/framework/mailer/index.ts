import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { IConfiguration } from "../types/configuration";
import { get } from "lodash";

export const defaultMailerInstance = async function(configuration: IConfiguration) {
  let testAccount = await nodemailer.createTestAccount();
  const wertiknodemailerDefaultConfiguration = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  };
  let transporterConfiguration = get(configuration, "email.configuration", wertiknodemailerDefaultConfiguration);
  let transporter = nodemailer.createTransport(transporterConfiguration);
  return transporter;
};

export const sendEmail = function(configuration: IConfiguration, mailerInstance: any) {
  let userPassedSendEmail = get(configuration, "email.sendEmail", null);
  if (userPassedSendEmail !== null) {
    return userPassedSendEmail;
  } else {
    return async function(template: string, variables: any, credentials: any) {
      let transporter = mailerInstance;
      let compiled = handlebars.compile(template);
      let resultTemplate = compiled(variables);
      try {
        let send = await transporter.sendMail({
          from: credentials.from,
          to: credentials.to,
          html: resultTemplate,
          subject: credentials.subject
        });
        if (send && send.messageId) {
          console.log("Message sent: %s", send.messageId);
        }
        if (nodemailer && nodemailer.getTestMessageUrl) {
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(send));
        }
        return send;
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
