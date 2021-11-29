# Modules

Wertik-js allows extending your app with more features using the `modules` term. To use a module Wertik JS provides a method called `useModule` which allows you to create a new module. Let's create a module.

```js
import wertik, {
  useDatabase,
  useMailer,
  useModule,
  useGraphql,
} from "wertik-js/lib/next";

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

# Modules GraphQL Schema and Database operations

When you provide `useDatabase: true`, `table` and `database`, Wertik JS automatically generates GraphQL schema, `updateInput` and `createInput`. For example let's say you have a table called `Games` with following fields:

- name: varchar
- publisher: varchar

You have to initialize its module in this way:

```js
import wertik, { useModule, useDatabase, useGraphql } from "wertik-js/lib/next";
wertik({
  port: 1200,
  graphql: useGraphql(),
  database: {
    default: useDatabase({
      name: "dbname",
      password: "pass",
      host: "localhost",
      port: 3306,
      username: "root",
    }),
  },
  modules: {
    games: useModule({
      useDatabase: true,
      name: "Games",
      table: "games",
      database: "default",
    }),
  },
});
```

Wertik JS will create a type called `Games`:

```graphql
type Games {
  name: String
  publisher: String
}
```

And for Update and Create inputs it will create inputs like this:

```graphql
input createGamesInput {
  name: String
  publisher: String
}

input updateGamesInput {
  name: String
  publisher: String
}
```

For filtering data from `games` table, Wertik JS will also create an input for filtering:

```graphql
input GamesFilterInput {
  name: StringFilterInput
  publisher: StringFilterInput
}
```

To explore more about `StringFilterInput` and other filter input please visit GraphQL Playground to get more familiar with it.

## This will generate

### Queries:

- view
- list
- count

```graphql
type Query {
  version: String
  viewGames(where: GamesFilterInput): Games
  listGames(
    pagination: PaginationInput
    where: GamesFilterInput
    sorting: [SortingInput]
  ): GamesList
  countGames(where: GamesFilterInput): Int
}
```

### Mutations:

- update
- create
- delete
- createOrUpdate

```graphql
type Mutation {
  version: String
  updateGames(
    input: updateGamesInput
    where: GamesFilterInput!
  ): GamesBulkMutationResponse
  createGames(input: [createGamesInput]): GamesBulkMutationResponse
  deleteGames(where: GamesFilterInput!): SuccessResponse
  createOrUpdateGames(id: Int, input: createGamesInput): Games
}
```

You can try these `Mutations` and `Queries` in your GraphQL playground. If you find any issues please create a new issue at:
https://github.com/Uconnect-Technologies/wertik-js/issues/new.

# More on filtering rows from a table

When you provide `useDatabase: true` for a module called Games. Wertik JS will create a query as:

```graphql
listGames(
  pagination: PaginationInput
  where: GamesFilterInput
  sorting: [SortingInput]
): GamesList
```

Where `PaginationInput` is

```graphql
input PaginationInput {
  page: Int
  limit: Int
}
```

And `GamesFilterInput` is same as Sequelize search object but main keywords such as like, `eq` or `like` starts with `_`, For example:

```graphql
query GamesList {
  listGames(where: { publisher: { _eq: "rockstar" } }) {
    list {
      publisher
    }
  }
}
```

And for sorting it is

```graphql
input SortingInput {
  column: String
  type: String
}
```

Sorting Example:

```graphql
query GamesList {
  listGames(sorting: [{ column: "id", type: "asc" }]) {
    list {
      publisher
    }
  }
}
```

To get more familiar with Schema please open your schema from Apollo Playground running at `http://localhost:1200/graphql` where `1200` is the default port of Wertik JS.

If you find any issues with `Filtering`, `Sorting` or `Paginating` rows. You can open a new issue at https://github.com/Uconnect-Technologies/wertik-js/issues/new.

# Using events with GraphQL CRUD operations

When you run a Query or Mutation on a module(Please check [Mutations and Queries](#this-will-generate)) Wertik JS fires an event, Please check Typescript interface called `useModuleProps.events`. Those are the list of events that you can use. To explore more about types you can click `Go to Type Definition` of method `useModule`.

When events are running you get access to Apollo GraphQL Resolver arguments where you can access Request params as well. For more please see https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/next/crud/index.ts#L76-L80

**Note: ** When you return something from event it will be considered as args, For more please see https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/next/crud/index.ts#:~:text=args%2C%20context%2C%20info)%3B-,args%20%3D%20argsFromEvent%20%3F%20argsFromEvent%20%3A%20args%3B,-const%20id%20%3D%20args

# Using useModule on method to add more features to your module

to be continued
