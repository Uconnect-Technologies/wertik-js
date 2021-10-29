
  

### Context

  

Context is an object that is passed to all resolvers while executing an operation in GraphQL, and same goes for Rest API, Context may contain data or functions. Like the current User data, Database Instance, Current Data Permissions and stuff like these.

  

Wertik-js provides these built-in context properties

  

- user: The current user

- dbTables: All database tables, See Sequelize Model

- models: All Wertik-js Models.

- sendEmail: Send email method

- emailTemplates: All email templates to be used in resolvers and http handlers.

- userPermissions: All user permissions if user exists

- userRoles: All user roles if user exists

- mailerInstance: Mailer instance

- req: Request Object

- res: Res object to send custom response, Varies with GraphQL and RestAPI

#### Create Context Handler
If you want to pass a function that executes while context creation, You can pass a function in your configuration, This function supports async await. `configuration.context.requestContext`, When this function will be called, two paramters will be passed,

- mode: This will be restApi or graphql, When this function runs in graphql then value will be graphql and for restApi it becomes restApi.
- context: For GraphQL this value is context object and for restApi it is req object so that you can access current context

At the end you have to return something from this function and that data will be available in your GraphQL resolver and RestAPI handler.

For GraphQL resolver:

```javascript
function (_, args, context,info) {
	console.log(context.requestContext)
}
```

For RestAPI handler:

```javascript
function (req,res) {
	console.log(req.requestContext)
}
```

####  Using Context in Rest API
Consider this rest api handler:
```javascript
function (req,res) {
  // do something
}
```
context is available in req.[context_name].
#### Using Context in GraphQL

Consider this resolver in GraphQL:
```javascript
function (_, args, context,info) {
  // do something
}
```
You can access wertik context through context.[context_name].

#### Sending Custom Context

If you want to send custom context in an object, Then you can pass context by `configuration.context.data`, This property should return an object. 

In GraphQL resolver you can access it by

```javascript
context.context
```

In RestAPI you can access it by

```javascript
req.context
```

If you have any questions regarding context, Please open an issue on our repo [https://github.com/Uconnect-Technologies/wertik-js/](https://github.com/Uconnect-Technologies/wertik-js/)