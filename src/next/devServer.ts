import wertik, {
  useMailer,
  useGraphql,
  useDatabase,
  useCronJob,
  useSocketIO,
  useModule,
  WertikBackupModule,
  useIndependentWebSocketsServer,
  useWebSockets,
} from "./index";
import { useQueue } from "./queue";

(async () => {
  wertik({
    port: 1200,
    queue: {
      sendEmails: useQueue({
        queueName: "sendEmails",
        url: "redis://127.0.0.1:6379",
        options: {
          limiter: {
            max: 12,
            duration: 32,
            bounceBack: true,
          },
        },
      }),
      sendPushNotification: useQueue({
        queueName: "sendPushNotification",
        options: {
          redis: { port: 6379, host: "127.0.0.1", password: "somepass" },
          limiter: {
            max: 12,
            duration: 32,
            bounceBack: true,
          },
        },
      }),
    },
    // cronJobs: {
    //   getCustomersEvery1Minute: useCronJob({
    //     name: "getCustomersEvery1Minute",
    //     expression: "* * * * *",
    //     handler(wertikApp) {
    //       console.log(wertikApp.queue);
    //     },
    //   }),
    // },
    modules: {
      customers: useModule({
        useDatabase: false,
        name: "customers",
        on({ useExpress }) {
          useExpress((expInstance) => {
            expInstance.get("/wow", (req, res) => {
              console.log(req.wertik.queue);
              res.send("send something back");
            });
          });
        },
      }),
    },
  });
})();
