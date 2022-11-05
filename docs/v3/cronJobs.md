# Cron Jobs

Wertik JS allows you to creating Cron Jobs that runs on interval. To use a Cron JOB you need to use `useCronJob`.

```js
import wertik, { useCronJob } from "wertik-js/lib/";

wertik({
  port: 1200,
  cronJobs: {
    runsEveryMinute: useCronJob({
      name: "Send emails to people every 1 minute",
      handler: (wertikApp) => {
        console.log("Date ", new Date().toLocaleDateString());
      },
      expression: "*/10 * * * * *",
    }),
  },
});
```

Above cron job will run every 1 minute and will print current date. So 1 minute after starting server you will see current date in console. Wertik JS also passes wertik app instance to handler as first argument, so you can use Wertik JS resources.

```log
Wertik JS app listening at http://localhost:1200
Date 11/28/2021
Date 11/28/2021
Date 11/28/2021
Date 11/28/2021
```
