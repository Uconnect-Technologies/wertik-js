let nodemailer = require('nodemailer');
import handlebars from "handlebars";
import fs from "fs";

const {
  MAILER_SERVICE,
  MAILER_SERVICE_USERNAME,
  MAILER_SERVICE_PASSWORD
} = process.env;

let transporter = nodemailer.createTransport({
	service: MAILER_SERVICE,
	auth: {
		user: MAILER_SERVICE_USERNAME,
		pass: MAILER_SERVICE_PASSWORD
	}
});


export function sendEmail(templateFile, variables, credentials) {
	let template = fs.readFileSync('app/mailer/templates/'+templateFile,'utf-8');
	let compiled = handlebars.compile(template);
	let resultTemplate = compiled(variables);
	return transporter.sendMail({
		from : credentials.from,
		to: credentials.to,
		html: resultTemplate,
		subject: credentials.subject
	})
}

export default transporter;

