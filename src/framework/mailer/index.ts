let nodemailer = require('nodemailer');
let handlebars = require("handlebars");

export const defaultMailerInstance = async function ()  {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });
  return transporter;
}

const defaultSendEmailMethod = async function (template: string, variables: any, credentials: any) {
  let transporter: any = await mailerInstance();
	let compiled = handlebars.compile(template);
	let resultTemplate = compiled(variables);
	try {
		let send = await transporter.sendMail({
			from : credentials.from,
			to: credentials.to,
			html: resultTemplate,
			subject: credentials.subject
		})
		console.log("Message sent: %s", send.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(send));
		return send;
	} catch (e) {
		console.log(`Failed sending email: ${e.message}`);
	}
}

export default async function mailerInstance() {
  return await defaultMailerInstance();
}

export const sendEmail = async function (template: string, variables: any, credentials: any) {
  return await defaultSendEmailMethod(template, variables, credentials);
}