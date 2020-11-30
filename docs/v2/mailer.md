#### email

**Type:** Object
**Default Value:**
**Description:** Wertik uses NodeMailer for emails. The configuration for email handling in Wertik

```javascript
{
  disable: true;
  configuration: NodeMailerConfigurationObject;
}
```

By default emailing is disabled in wertik, Assigning false to disable activates the emailing in wertik. You have to provide second arugment which is configuration of Node mailer.

When pasing mailer. Wertik sends a method called sendEmail to context to send emails. Please see this function for more details: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/mailer/index.ts#L22. Since its a closure, Main function starts from here: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/mailer/index.ts#L22.
