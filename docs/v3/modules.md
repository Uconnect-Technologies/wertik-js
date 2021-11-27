### Modules

Wertik-js allows extending your app with more features using `modules` term. To use a module Wertik JS provides a method called `useModule` which allows you to create a new module. Let's create a module.

```js
import wertik, {
  useDatabase,
  useMailer,
  useModule,
  useGraphql,
} from "wertik-js/lib";
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
  graphql: useGraphql(),
  mailer: {
    default: useMailer(),
  },
  modules: {
    users: useModule({
      table: "users",
      database: "default",
      name: "users",
      useDatabase: true,
    }),
  },
});
```

Please check this interface file for what type of options does `useModule` function requires: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/next/types/types.ts#:~:text=export%20interface%20useModuleProps%20%7B
