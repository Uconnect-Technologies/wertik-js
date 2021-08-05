import nodemailer from "nodemailer";
import handlebars from "handlebars";

export const useMailer = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let testAccount = await nodemailer.createTestAccount();
      const wertiknodemailerDefaultConfiguration = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      };
      let transporter = nodemailer.createTransport(
        wertiknodemailerDefaultConfiguration
      );
      resolve(transporter);
    } catch (e) {
      console.log(`Something went wrong while setting up email system: ${e.message}`)
      reject(e)
    }
  })
};

export const emailSender = (app) => {
  return (mailer, options) => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(true);

        let transporter = app.email[mailer];

        if (!transporter) {
          throw new Error(
            `Email integration ${mailer} not found. Please check the typo.`
          );
        }

        let compiled = handlebars.compile(options.template);
        let resultTemplate = compiled(options.variables);
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
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  };
};
