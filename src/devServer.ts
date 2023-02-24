import wertik, { useMysqlDatabase, useGraphql, useModule } from "./index"

wertik({
  port: 1200,
  graphql: useGraphql(),
  database: {
    wapgee_prod_new: useMysqlDatabase({
      port: 3306,
      name: "wapgee_prod_new",
      host: "localhost",
      password: "pass",
      username: "root",
    }),
    test: useMysqlDatabase({
      username: "root",
      port: 3306,
      password: "pass",
      host: "localhost",
      name: "wertik",
    }),
  },
  modules: {
    User: useModule({
      name: "User",
      useDatabase: true,
      table: "users",
      database: "wapgee_prod_new",
      on: function ({hasMany}) {
        hasMany({
          database: "wapgee_prod_new",
          graphqlKey: "posts",
          module: "Post",
          options: {
            as: "posts",
            foreignKey: "created_by",
            sourceKey: "id",
          }
        })
      }
    }),
    Post: useModule({
      name: "Post",
      useDatabase: true,
      table: "post",
      database: "wapgee_prod_new",
      on: function ({belongsTo}) {
        belongsTo({
          database: "wapgee_prod_new",
          graphqlKey: "author",
          module: "User",
          options: {
            as: "author",
            sourceKey: "created_by",
            foreignKey: "id",
          }
        })
      }
    }),
    test: useModule({
      name: "Shirts",
      useDatabase: true,
      database: "test",
      table: "shirts",
    }),
  },
})
