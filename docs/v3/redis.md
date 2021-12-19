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


### Accessing redis inside Expres handler or GraphQL Resolver

You can access Redis instances inside GraphQL and Express handler through:

- Express

```javascript
app.get("/somepath", (req, res) => {
  console.log(req.wertik.redis); // will return object of redis instances
  res.send("Some Info");
});
```

- GraphQL Resolver

```javascript
function Resolver(_, args, context, info) => {
  console.log(context.wertik.redis); // will return object of redis instances
  return "Some Info"
}
```