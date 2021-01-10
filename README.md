## Wertik JS


Wertik is a **💪 GraphQL + Rest API** framework to build servers that gives you support for GraphQL, Rest Api, Emailing, Storage, Sockets and Cron Jobs feature.


<div>
	<img  style="float: left;margin: 10px 0;"  src="https://img.shields.io/github/downloads/ilyaskarim/wertik-js/total?style=flat-square">
	<img  style="float: left;margin: 10px 0;"  src="https://img.shields.io/npm/dw/wertik-js?style=flat-square">
	<img  style="float: left;margin: 10px 0;"  src="https://img.shields.io/github/issues-raw/ilyaskarim/wertik-js?style=flat-square">
</div>

### Installation

To install you can use npm or yarn, To install with npm:

```

npm install --save wertik-js

```

Install with yarn

```

yarn add wertik-js --dev

```

### Setting up server

Lets setup an app:

```javascript
import { connectDatabase, serve } from "wertik-js";

import configuration from "./path/to/your/configuration";

connectDatabase(configuration.database)
  .then((databaseInstance) => {
    configuration.databaseInstance = databaseInstance;
    serve(configuration).then((wertikApp: any) => {
      wertikApp.database.sync();
    });
  })
  .catch((e) => {
    console.log(`Error connecting with database`);
    console.log(e);
  });
```

If everything goes fine, you will see:

```
✔ [Wertik-js]: Socket.IO server running at http://localhost:5000
✔ [Wertik-js]: Rest API server started at http://localhost:5000
✔ [Wertik-js]: GraphQL Voyager running at http://localhost:5000/graphql-voyager
✔ [Wertik-js]: GraphQL Server started at http://localhost:5000/graphql
✔ [Wertik-js]: GraphQL Subscriptions are running at ws://localhost:5000/subscriptions
✔ [Wertik-js]: Database: Successfully Connected!
```

**Note: 5000 is the default port**

The above code example is taken from: [Dev Server Example](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/devServer.ts)

### Further Steps

Now you have installed weritk-js in your app, now next step is to get familiar with the configuration to use. Let's go with the documentation flow:

1. Configuration
2. Database
3. Rest Api
4. GraphQL
5. Mailer
6. Sockets
7. Storage
8. Custom Modules
9. Cron Jobs

The documentation is hosted at [http://wapgee.com/wertik-js](http://wapgee.com/wertik-js).

### Versioning

Wertik-js follows semantic versioning (semver) principles. The version can be look like this, X.Y.Z,

- **Z** When fixing bug we relase with chaning Z. For example: 1.2.1 to 1.2.2
- **Y** When adding feature we release with changing Y, For example: 1.2.1 to 1.3.1
- **Z** When adding breaking changes we made this release. For example: 1.2.1 to 2.2.1

### Contributing

Pull Requests are welcome. If you think something is missing or needs to changed. Please open a pull request or new issue.

## License

[MIT](https://choosealicense.com/licenses/mit/)
