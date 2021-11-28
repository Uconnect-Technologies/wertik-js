# GraphQL

For GraphQL, Wertik JS uses Apollo GraphQL under the hood. We choose Apollo GraphQL because it is well managed and bug-free. To set up Graphql Wertik JS provides a function called `useGraphql` to use Graphql in your app.

```javascript
import wertik, { useGraphql } from "wertik-js/lib/inex";
wertik({
  port: 1200,
  graphql: useGraphql(useGraphqlProps),
});
```

This will initialize GraphQL on URL: http://localhost:1200/graphql. If you visit this link you will Apollo GraphQL playground.

#### useGraphqlProps

useGraphqlProps is an argument which is optional when using `useGraphql` method.

```typescript
export interface useGraphqlProps {
  options?: {
    [key: string]: any;
  };
  applyMiddlewareOptions?: GetMiddlewareOptionsGraphql;
  resolvers?: {
    Mutation: {};
    Query: {};
  };
  typeDefs?: string;
}
```

- options includes ApolloServer options.
- applyMiddlewareOptions includes options while integrating Apollo Server with express server with same port.
- resolvers for defined schema in useGraphqlProps.typeDefs.
- typeDefs is your graphql schema.
