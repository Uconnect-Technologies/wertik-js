import nodemailer from "nodemailer"
import handlebars from "handlebars"
import { useMailerProps, WertikApp, WertikConfiguration } from "../types"
import { emailSendProps } from "../types/mailer"
import { get } from "lodash"

export const useMailer = (props: useMailerProps) => {
  return async () => {
    let testAccount = props.options
      ? null
      : await nodemailer.createTestAccount()

    const emailConfiguration = props.options
      ? props.options
      : {
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount?.user,
            pass: testAccount?.pass,
          },
        }

    console.log(`[Mailer]`, `Initialized mailer "${props.name}"`)

    return nodemailer.createTransport(emailConfiguration)
  }
}

export const emailSender = ({
  configuration,
  wertikApp,
}: {
  configuration: WertikConfiguration
  wertikApp: WertikApp
}) => {
  const fn = async (props: { mailer: string; options: emailSendProps }) => {
    let transporter = wertikApp.mailer[props.mailer]

    try {
      if (!transporter) {
        throw new Error(
          `Email integration ${props.mailer} not found. Please check the typo.`
        )
      }

      let compiled = handlebars.compile(props.options.template)
      let resultTemplate = compiled(props.options.variables ?? {})
      let emailInstance = await transporter.sendMail({
        from: props.options.from,
        to: props.options.to,
        html: resultTemplate,
        subject: props.options.subject,
      })
      if (emailInstance && emailInstance.messageId) {
        console.log("Message sent: %s", emailInstance.messageId)
      }
      if (nodemailer && nodemailer.getTestMessageUrl) {
        console.log(
          "Preview URL: %s",
          nodemailer.getTestMessageUrl(emailInstance)
        )
      }

      if (configuration.mailer.events.onEmailSent) {
        configuration.mailer.events.onEmailSent({
          mailer: props.mailer,
          options: props.options,
          wertikApp,
          configuration,
          emailInstance,
          previewURL:
            nodemailer && nodemailer.getTestMessageUrl
              ? nodemailer.getTestMessageUrl(emailInstance)
              : "",
        })
      }

      return emailInstance
    } catch (e) {
      console.log(e)
      if (configuration.mailer.events.onEmailSentFailed) {
        configuration.mailer.events.onEmailSentFailed({
          mailer: props.mailer,
          options: props.options,
          wertikApp,
          configuration,
          error: e,
        })
      }
    }
  }
  return fn
}
