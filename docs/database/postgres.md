### Database - PostgreSQL

To connect with your PostgreSQL database, You need to share your `Database Name`, `Database Password`, `Database Username` and `Database Host` same as MySQL but `dbDialect` must be postgres. Here is how to connect with your PostgreSQL database:

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