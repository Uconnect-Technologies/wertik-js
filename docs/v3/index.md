#### Wertik-JS V3

Wertik is a tiny Node JS framework that helps you setting up servers with support for GraphQL, Rest Api, Emailing, Storage, Sockets and Cron Jobs feature.

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

```javascript
import wertik from "wertik-js/lib";

weritk({
  port: 1200,
});
```

In your console you will see something like this:

```
Wertik JS app listening at http://localhost:1200
```

If you visit http://localhost:1200 you will see response like this:

```
Cannot GET /
```

This is because wertik-js has started the server for you and there's nothing in it right now. Let's make it interactive now.
