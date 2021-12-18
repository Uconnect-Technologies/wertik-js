# Redis(Beta)

Wertik JS allows a using redis, Wertik JS uses package named `redis`. Wertik JS gives a function called `useRedis` which allows creating a redis server. Let's create a redis client:

```javascript
import wertik, { useRedis } from "wertik-js/lib/next";
wertik({
port: 1200,
    redis: {
        testRedis: useRedis({
            name: "testRedis"
        })
    }
})
```

This print in console:

```log
[REDIS] Initialized redis testRedis
Wertik JS app listening at http://localhost:1200
```