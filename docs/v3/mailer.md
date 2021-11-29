# Email

To send emails. Wertik-js uses Node Mailer for sending emails. To setup emails Wertik JS provides a function called `useMailer` as argument you need to pass Node Mailer Configuration.

```js
import wertik, { useDatabase, useMailer } from "wertik-js/lib/next";
weritk({
  port: 1200,
  database: {
    default: useDatabase({
      name: "default",
      password: "pass",
      host: "localhost",
      port: 3306,
      username: "root",
    }),
  },
  mailer: {
    default: useMailer(),
  },
});
```

`useMailer` will ask for node mailer configuration. The configuration passed through `useMailer` will be used here:

`nodemailer.createTransport(theConfigurationYouPassed)`

### Sending Emails

Once you set up at least one mail. In context, wertik will pass `sendEmail(mailer: string, options: emailSendProps)` method that will send email using a different email. Send Email API: `sendEmail(mailer: string, options: emailSendProps)`. The mailer will be `default` here. And the options include:

```typescript
export interface emailSendProps {
  template: string;
  variables: {
    [key: string]: any;
  };
  from: string;
  to: string;
  subject: string;
}
```

If you want dynamic data you can pass a template as a handlebars template. And variables will be an object.
