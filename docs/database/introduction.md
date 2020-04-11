### Database

Wertik-js currently provides following database features

- Mysql
- PostgreSQL
  Upcoming database support
- MongoDB

#### MySQL

To connect with your MySQL database, You need to share your `Database Name`, `Database Password`, `Database Username` and `Database Host`. Here is how to connect with your MySQL database:

```javascript
export  default {
	name:  "Wertik",
	// ... Rest of the configuration
	database: {
		dbDialect:  "mysql",
		dbUsername:  "root",
		dbPassword:  "pass",
		dbName:  "graphql",
		dbHost:  "localhost",
		dbPort:  "3306",
	},
	// ... Rest of the configuration
};
```

#### PostgreSQL

To connect with your PostgreSQL database, You need to share your `Database Name`, `Database Password`, `Database Username` and `Database Host` same as MySQL but `dbDialect` must be postgres. Here is how to connect with your PostgreSQL database:

```javascript
export  default {
	name:  "Wertik",
	// ... Rest of the configuration
	database: {
		dbDialect:  "postgres",
		dbUsername:  "root",
		dbPassword:  "pass",
		dbName:  "graphql",
		dbHost:  "localhost",
		dbPort:  "3306",
	},
	// ... Rest of the configuration
};
````
