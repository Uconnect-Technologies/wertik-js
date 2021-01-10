#### GraphQL

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