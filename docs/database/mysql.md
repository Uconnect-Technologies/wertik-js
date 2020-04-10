
### Database - MySQL

To connect with your MySQL database, You need to share your `Database Name`, `Database Password`, `Database Username` and `Database Host`. Here is how to connect with your MySQL database:

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