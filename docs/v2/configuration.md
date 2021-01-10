### Configuration

Wertik runs on a single object, It is like options or configuration. Configuration everything about mailer, garphql, restapi, sockets and custom modules.

Before getting started, Have a look at our [Default Configuration](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/defaults/defaultConfigurations/defaultConfiguration.ts) to get an idea about configuration. Let's go with the configuration:

#### name

**Type:** String
**Default Value:** Wertik
**Description:** The name of your application

#### builtinModules

**Type:** String
**Default Value:** user,auth,forgetPassword,permission,role,rolePermission,userPermission,userRole,me,storage,mail
**Description:** Wertik-js provide some builtin module. To enable them you have to provide their names by comma separate.

#### database

**Type:** Object
**Default Value:**
**Description:** Your database credentials.

```javascript
{
  dbDialect: process.env.dbDialect,
  dbUsername: process.env.dbUsername,
  dbPassword: process.env.dbPassword,
  dbName: process.env.dbName,
  dbHost: process.env.dbHost,
  dbPort: process.env.dbPort,
}
```

#### port

**Type:** Number | Integer
**Default Value:** 5000
**Description:** The port on which your application will run

#### startServers

**Type:** Boolean
**Default Value:** true
**Description:** If assign true, Wertik will start server. If assign false, Wertik will not start servers. You have to start servers. Wertik gives you following properties to start servers: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/main.ts#L114.

#### frontendAppUrl

(obselete donot use this option)

#### frontendAppActivationUrl

(obselete donot use this option)

#### frontendAppPasswordResetUrl

(obselete donot use this option)

#### context

**Type:** Object `{initializeContext: Function, requestContext: Function}`

**Description:** The is same as the graphql context argument and in express passing properties through req object to rest api handlers. So here are two things, initializeContext that will run one time when application starts and passes to each context of graphql and express. And requestContext will every time you pass a request to server.
For rest api please see initializeContext: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/index.ts#L28
For rest api please see requestContext: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/index.ts#L46

For graphql please see initializeContext: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/graphql/index.ts#L20
For graphql please see requestContext: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/graphql/index.ts#L60

**Default Value:**

```javascript
{
  {
  initializeContext: function (mode, context) {
    return {
      someKey: "somekeyvalue",
    };
  },
  requestContext: async function (mode, context) {
    return {
      value: "Value 1",
    };
  }
}
```

#### email

**Type:** Object
**Default Value:**
**Description:** Wertik uses NodeMailer for emails. The configuration for email handling in Wertik

```javascript
{
  disable: true;
  configuration: NodeMailerConfigurationObject;
}
```

By default emailing is disabled in wertik, Assigning false to disable activates the emailing in wertik. You have to provide second arugment which is configuration of Node mailer.

When pasing mailer. Wertik sends a method called sendEmail to context to send emails. Please see this function for more details: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/mailer/index.ts#L22. Since its a closure, Main function starts from here: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/mailer/index.ts#L22.

#### graphql

**Type:** Object
**Default Value:**
**Description:** Options for graphql. We have used Apollo Graphql.

```javascript
{
  disable: false,
  apolloGraphqlServerOptions: defaultApolloGraphqlOptions
}
```

apolloGraphqlServerOptions are the options for apollo graphql. For more details please see: https://www.apollographql.com/docs/apollo-server/api/apollo-server/#options.

Note: Please donot add these options context, resolvers and typeDefs.

#### restApi

**Type:** Object
**Default Value:**
**Description:** This is the options for rest api. Which means the express.

```javascript
const a = {
  showWertik404Page: true
  restApi404Handler: function (req, res) {
    res.status(404).json({
      message: "Not found",
      data: {
        message: "Request page didn't found",
      },
    });
  },
  beforeStart: Void
}
```

If you don't want wertik to show 404 page, you can assign it as 404. You can also customize 404 response with restApi404Handler helper. beforeStarts run before starting server.

#### modules

**Type:** Array<IConfigurationCustomModule>
**Default Value:** []
**Description:** To add your custom functionality, you can use modules, Like User module. Companies Module. User Role module. To get an idea please visit: https://github.com/Uconnect-Technologies/wertik-js/tree/master/src/framework/builtinModules.

Please see an example module from here: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/builtinModules/userRole/index.ts.

For details about custom modules please visit: http://wapgee.com/wertik-js/custom-modules/introduction.

#### events - beta

**Type:** Object
**Default Value:** `{}`
**Description:** So events run when something happens. Right now wertik offer events on database model insert and update.

For more please visit this page for configuration idea: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/types/configuration.ts#L137

For graphql: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/graphql/crudGenerator.ts#L112
For rest api: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/versions/v1/loadAllModules.ts#L40

#### seeds

(We recommend to use some other seed helpers like knex seeds or sequelize seeds).

#### sockets - beta

**Type:** Object
**Default Value:**
**Description:** For sockets we use Socket.IO.

```javascript
{
  disable: false,
  onClientConnected: function () {
    console.log("onClientConnected");
  },
  onMessageReceived: function () {
    console.log("onMessageReceived");
  },
  onClientDisconnect: function () {
    console.log("onClientDisconnect");
  },
};
```

For please visit https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/socket/index.ts.

#### storage - beta

**Type:** Object
**Default Value:**

```javascript
{
    storageDirectory: "./uploads/",
},
```

**Description:** Its a module for storage functionality in your app.

For please visit: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/builtinModules/storage/index.ts.

### Cron - beta

**Type:** Object
**Default Value:** {}
**Description:** Under the we use node-cron library for cron jobs. Please see https://www.npmjs.com/package/node-cron. You can

For more please [Default Configuration](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/defaults/defaultConfigurations/defaultConfiguration.ts) to get an idea about cron jobs.
