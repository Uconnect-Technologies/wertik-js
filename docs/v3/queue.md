# Queue Management

Managing Queue is now really simple with Wertik JS, all you have to do is use `useQueue`, and you actually have it initiated already.

## Why use it?

When handling requests from API clients, We might run into a situation where a request initiates a CPU intensive operation that could potentially block other requests. Instead of processing such tasks immediately and blocking other requests, we can defer it to be processed in the future by adding information about the task in a processor. A task consumer will then pick up the task from the queue and process it.

It is considered the elegant way of scaling and solving performance challenges in common applications.

```js
import wertik, { useQueue } from "wertik-js/lib/next"

wertik({
  port: 1200,

  // Specifying Redis connection using redis url

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

    // Specifying Redis connection using object

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
})
```

This `useQueue` method simply instantiates a new instance of bull and returns that instance.

- A given queue is always referred by its name (instantiation name) as `queueName: "sendPushNotification"`

- The optional url `url:'redis://127.0.0.1:6379',` parameter is used to specify the Redis connection `string`. If no url is specified, bull will try to connect to default Redis server running on `localhost:6379`

- A queue can be instantiated with some useful options, for instance, we can specify the `location` and `password` of our Redis server, as well as some other useful settings. we can use them as `options : {redis : {port : 6379, host : "127.0.0.1", password : "somepass" }}`.

#### useQueueProps

-The `useQueue` method always expects an instantiation name such as(`my-queue-name`) all the other arguments are optional.

```typescript
export interface useQueueProps {
  queueName?: string
  url?: string
  options?: QueueOptions
}
```