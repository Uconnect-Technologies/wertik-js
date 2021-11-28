# Cron Jobs

Wertik JS allows you to creating Cron Jobs that runs on interval. To use a cron job you need to use `useCronJob`.

```js
import wertik, { useCronJob } from "wertik-js/lib/next";

wertik({
  port: 1200,
  cronJobs: {
    runsEveryMinute: useCronJob({
      name: "Send emails to people every 1 minute",
      handler: () => console.log(new Date().toLocaleDateString()),
      expression: "*/10 * * * * *",
    }),
  },
});
```

Above cron job will run every 1 minute and will print current date. So 1 minute after starting server you will see current date in console.

```log
Wertik JS app listening at http://localhost:1200
11/28/2021
11/28/2021
11/28/2021
11/28/2021
....
```
