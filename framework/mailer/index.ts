let nodemailer = require('nodemailer');
let handlebars = require("handlebars");

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

export async function sendEmail(templateFile: string, variables: any, credentials: any,useCustomTemplate: any, customTemplate: any) {
	let template = null;
	if (!useCustomTemplate) {
		template = fs.readFileSync(__dirname+"/templates/"+templateFile,'utf-8');
	}else {
		template = customTemplate;
	}
	let compiled = handlebars.compile(template);
	let resultTemplate = compiled(variables);
	return await transporter.sendMail({
		from : credentials.from,
		to: credentials.to,
		html: resultTemplate,
		subject: credentials.subject
	})
}

export default transporter;

