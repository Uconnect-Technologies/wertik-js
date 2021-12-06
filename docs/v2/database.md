### Database

Wertik-js uses Sequelize and supports the database that sequelize support. Database connection can be pass by:

```javascript
export default {
  name: "Wertik",
  // ... Rest of the configuration
  database: {
    dbDialect: "mysql",
    dbUsername: "root",
    dbPassword: "pass",
    dbName: "graphql",
    dbHost: "localhost",
    dbPort: "3306",
  },
  // ... Rest of the configuration
};
```
