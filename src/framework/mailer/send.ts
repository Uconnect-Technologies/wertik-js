let handlebars = require("handlebars");
let nodemailer = require('nodemailer');
import transporterF from "./index";

export default async function sendEmail(template: string, variables: any, credentials: any) {
	let transporter = await transporterF();
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