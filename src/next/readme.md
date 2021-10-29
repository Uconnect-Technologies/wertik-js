# Wertik-js Next

Redeveloped Wertik-js again taking care of the mistakes I did in past. So the library will be initialized through. I will follow the pattern of hooks in React.

```javascript
import wertik from "wertik-js";

wertik({
  port: 5050,
});
```

This is how the app will run. very simple.

## Database

Wertik-js will support multiple databases

```javascript
import wertik, { useDatabase } from "wertik-js";

wertik({
  port: 5050,
  database: {
    gamesDatabase: useDatabase({
      port: 0134,
      password: "pass",
      username: "root",
      host: "localhost",
      name: "games",
    }),
    clientsDatabase: useDatabase({
      port: 0134,
      password: "pass",
      username: "root",
      host: "localhost",
      name: "clients",
    }),
  },
});
```

## Modules

To create a custom module you will need to todo some thing like this, IT will automatically generate all graphql subscriptions.

```javascript
import wertik, { useModule } from "wertik-js";

wertik({
  port: 5050,
  modules: {
    users: useModule({
      hasDatabase: true, // by default true
      database: "YOUR_DATABASE",
      table: "TABLE_NAME",
      on: function ({ useExpress, useQuery, useMutation }) {
        useExpress((express) => {
          // express is the express instance
        });
        query({
          query: ``,
          resolver() {},
        });
        mutation({
          query: ``,
          resolver() {},
        });
      },
    }),
  },
});
```

## Modules

To setup email you'll have to do something like this:

```javascript
import wertik, { useMailer } from "wertik-js";

wertik({
  port: 5050,
  mailer: useMailer({
    //nodemailerconfiguration and sendemail function will be passed to graphql resolvers and to rest api req object
  }),
});
```

## Sockets

To use sockets you will need to do following and socket will be available in context.

```javascript
import wertik, { useSockets } from "wertik-js";

wertik({
  port: 5050,
  sockets: useSockets({
    onClientConnected: ({ socket, context }) => {},
  }),
});
```

## Storage and backup

To use storage and backup feature you will need to use useStorage and it will provide you functions to take backups to local, digital ocean and dropbox.

```javascript
import wertik, { useStorage } from "wertik-js";

wertik({
  port: 5050,
  storage: useStorage({
    dropbox: {
      // dropbox creds
    },
    digitalOceanSpaces: {
      // dropbox creds
    },
  }),
});
```

## Cron JOBS

To use Cron JOBS you will have to use useCron to run cron jobs and in each function you will have context to access your app.

```javascript
import wertik, { useCronJobs } from "wertik-js";

wertik({
  port: 5050,
  cronJobs: useCronJobs((schedule) => {
    schedule("schema", (context) => {
      // context will contain your app
    });
  }),
});
```

## Assigning GraphQL Queries and Mutations in root

To assign graphql queries and mutations in root you have to assign like this:

```javascript
import wertik, { useCronJobs } from "wertik-js";

wertik({
  port: 5050,
  graphql: {
    typeDefs: ``,
    resolvers: {
      Query: {},
      Mutation: {},
    },
  },
});
```

...To be continued.
