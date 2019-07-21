let fs = require("fs");
let handlebars = require("handlebars");
let nodemailer = require('nodemailer');

let {join} = require('path');
import transporterF from "./transporter";

export async function sendEmail(templateFile: string, variables: any, credentials: any) {
	let transporter = await transporterF();
	let template = null;
	template = fs.readFileSync(join(__dirname, "/../../../email-templates/", templateFile),'utf-8');
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

// export default transporter;

