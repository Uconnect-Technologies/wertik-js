# Wertik-JS V3

Wertik is a tiny Node JS framework that helps you setting up servers with support for

- MySQL Database
- Emailing
- GraphQL
- Modules
- Rest Api
- Storage
- Sockets
- Cron Jobs

### Installation

You can install wertik-js by using yarn or npm:

Yarn

```
yarn add wertik-js
```

Npm

```
npm install wertik-js
```

### Setting up server

To start wertik-js server you need to import wertik and start it:

```js
import wertik from "wertik-js/lib";
weritk({
  port: 1200,
});
```

In your console you will see something like this:

```log
Wertik JS app listening at http://localhost:1200
```

If you visit http://localhost:1200 you will see response like this:

```log
Cannot GET /
```

🚀 You have successfully started wertik server. Right now there is nothing in wertik app right now. Let's make it interactive by adding:

- MySQL Database
- Emailing
- GraphQL
- Modules
- Rest Api
- Storage
- Sockets
- Cron Jobs
