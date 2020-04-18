### Events - Beta

Events are so useful on backend server when you want do a follow. For example, Send email after blog is published to subscribers. In these case events are so useful. Let's start with an example to get more familiar with Wertik-js events. Consider you are using events for module Role, See module at https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/builtinModules/role/index.ts


### Database Events

#### Configuration for Role events

Lets see how you can setup event handlers for module Role. To see list of events please check this typescript file: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/types/configuration.ts#L98.

If you checked that file, Those are the list of all events that can be used with Role CRUD. So you can adjust Role module according to your needs without changing changing any thing. An example:

```javascript
let configuration = {
  // rest of your configuration
  events: {
    database: {
      Role: {
        beforeCreate: function (mode, params) {
          // mode can be restApi or graphql
          // if mode == graphql params will contain graphql resolver arguments {parent, args, context, info}
          // if mode == graphql params will contain rest Api handler arguments {req, res}
          // While sugin beforeCreate event you to reutrn the arguments that is going to be used, like
          if (mode == "graphql") {
            return params.args.input;
          }else {
            return req.body.input
          }
        },
        afterCreate: function (mode, params) {
          // same mode params goes as above
          // params will be same but another property will be added which will be instance that is created.
          console.log("Role created");
        }
      }
    }
  }
}
```

 Let's see how to use events with Rest API and GraphQL

#### Events with Rest API

To use events, You can do something like this

```javascript
let configuration = {
  //rest of your configuration
  events: {
    database: {
      Role: {
        beforeCreate: function (mode, params) {
          // mode == "restApi"
          // params == {req,res}
          if (mode == "graphql") {
            return params.args.input;
          }else {
            return req.body.input
          }
        },
        afterCreate: function (mode, params) {
          // params == {req,res,instance}
          console.log("Created with restApi",);
        }
      }
    }
  }
}
```

#### Events with GraphQL


```javascript
let configuration = {
  //rest of your configuration
  events: {
    database: {
      Role: {
        beforeCreate: function (mode, params) {
          // mode == "graphql"
          // params == {_, args, context,info}
          if (mode == "graphql") {
            return params.args.input;
          }else {
            return req.body.input
          }
        },
        afterCreate: function (mode, params) {
          // params == {_, args, context,info,instance}
          console.log("Created with graphql",);
        }
      }
    }
  }
}
```


### General Events

**Coming Soon**