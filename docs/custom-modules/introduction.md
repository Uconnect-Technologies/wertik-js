### Custom Modules

With this guide, you can extend your app with extra modules and functionality. Let's create a Articles module in this example.

So, This is how your complete module will look like.

```javascript
let otherConfiguration = {}; // Here other wertik configuration
let configuration = {
  ...otherConfiguration,
  modules: [
    {
      name: "Article",
      useDatabase: true,
      fields: {
        sql: {
          title: {
            type: "String",
          },
        },
      },
      graphql: {
        crud: {
          query: {
            generate: true,
            operations: "*",
          },
          mutation: {
            generate: true,
            operations: "*",
          },
        },
        // Main schema for Article
        schema: `
						type Article {
						 title: String
						}
						type ArticleInput {
						 title: String
						}
					`,
        mutation: {
          schema: ``, // Write mutation schema for your module Article
          resolvers: {}, // Resolvers for article mutations
        },
        query: {
          schema: ``, // Write query schema for your module Article
          resolvers: {}, // Resolvers for article query
        },
      },
      restApi: {
        endpoints: [
          {
            path: "/people/", // Will be available under http://localhost:port/api/v1/article/people/
            methodType: "get", // get,post,put,delete,copy,head,options,link,unlink,purge,lock,unlock,view
            handler: async function (req, res, restApiSuccessResponse, restApiErrorResponse) {
              let somethinWentFine = true;
              if (somethinWentFine) {
                restApiSuccessResponse({
                  res: res,
                  data: {
                    success: true,
                  },
                  message: `Went all fine`,
                });
              } else {
                restApiErrorResponse({
                  err: Error,
                  res: res,
                  data: {
                    message: "Something went wrong",
                    message: "Detail",
                  },
                });
              }
            },
          },
        ],
      },
    },
  ],
};
export default configuration;
```

#### Database options:

To allow database you have to configure your module in this way:

```javascript
let configuration = {
  modules: [
    {
      useDatabase: true, // Set false if you are not storing data for this module.
      database: {
        sql: {
          tableName: "YOUR_TABLE_NAME",
          tableOptions: {
            // Use Sequelize table options here, Please see https://sequelize.org/v5/manual/models-definition.html
            // See section: Apart from datatypes, there are plenty of options that you can set on each column.
          },
          fields: {
            // Use Sequelize table fields here, Please see https://sequelize.org/v5/manual/models-definition.html
          },
        },
      },
    },
  ],
};
```

#### GraphQL:

To Enable to GraphQL, You have to configure your module in this way:

```javascript
let configuration = {
  modules: [
    {
      // other module configuration
      graphql: {
        crud: {
          query: {
            generate: true,
            operations: "*", // Options are view, list
          },
          mutation: {
            generate: true,
            operations: "*", // Options are create update delete softDelete bulkcreate bulkupdate bulkdelete bulkSoftDelete
          },
        },
        // In schema you have to Provide same type as you provided the moduleName, Consider you have provided Person you have to set it as Person with attributes
        // PersonInput is an input that will be used for mutations. If you set your module to Person then input name should be PersonInput
        schema: `
							type Person {
								id: Int
								name: String
							}
							input PersonInput {
								id: Int
								name: String
							}
						`,
        // You can add more custom mutations to this module, See below
        mutation: {
          schema: `
								UpdatePersonWithUser(input: PersonInput): Person
							`,
          resolvers: {
            // Here as you have set mutation name as UpdatePersonWithUser, you have provide a method with same name:
            UpdatePersonWithUser: async (_, args, context, info) => {
              // _ is the fields parent, as Apollo states: The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain).
              // args is the object passed from oustide
              // For please see context part
              // info is the information about Query
              // Read more about resolver arguments here: https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
              return {}; // Something
            },
          },
        },
        query: {
          // You can add custom Query to your module
          schema: `
								ReturnbasicPerson: Person
							`,
          resolvers: {
            ReturnbasicPerson: async (_, args, context, info) => {
              return {
                id: 1,
                name: "John",
              };
            },
          },
        },
      },
    },
  ],
};
```

#### GraphQL Subscription:

The above module will generate these GraphQL subscriptions:

    UserRoleCreated: UserRole
    UserRoleSaved: UserRole
    UserRoleDeleted: SuccessResponse
    UserRoleUpdated: UserRole
    UserRoleSoftDeleted: UserRole

#### Rest API:

So when you enable useDatabase feature, If you have enabled RestAPI these API's will be generated by Wertik for the module named Person:

      [SAVE] http://localhost:7000/api/v1/person/save - {input: args }
      [POST] http://localhost:7000/api/v1/person/create - {input: args }
      [PUT] http://localhost:7000/api/v1/person/update - {input: args }
      [GET] http://localhost:7000/api/v1/person/view/:id
      [DELETE] http://localhost:7000/api/v1/person/:id/delete
      [POST] http://localhost:7000/api/v1/person/list - { filters: [], pagination: [], sorting: [] }
      [POST] http://localhost:7000/api/v1/person/bulk-create - {input: args }
      [PUT] http://localhost:7000/api/v1/person/bulk-update - {input: args }
      [DELETE] http://localhost:7000/api/v1/person/bulk-delete {input: [12,13,15]}
      [DELETE] http://localhost:7000/api/v1/person/soft-delete - {input: {id: 12} }
      [DELETE] http://localhost:7000/api/v1/person/bulk-soft-delete - {input: [12,13,15]}

7000 is your RestAPI port. You can change it. To create custom Rest API endpoints, You can do something like this:

```javascript
let configuration = {
  // other configuration
  modules: [
    {
      name: "Person",
      restApi: {
        endpoints: [
          {
            path: "/path",
            methodType: "post",
            handler: (req, res, restApiSuccessResponse, restApiErrorResponse) => {
              let isAllRight = true;
              if (isAllRight) {
                restApiSuccessResponse({
                  res: res,
                  message: "String",
                  data: {},
                });
              } else {
                restApiErrorResponse({
                  code: 500,
                  err: e,
                  res: res,
                  data: {},
                });
              }
            },
          },
        ],
      },
    },
  ],
};
```
