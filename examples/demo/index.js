// Import files for database connection and serving wertik.
const { serve, connectDatabase } = require("./../../index");
// import default configuration, remember you have to add .env setup.
const configuration = require("./../../lib/framework/defaults/defaultConfigurations/defaultConfiguration").default;

// Connect to database.
connectDatabase(configuration.database)
  .then((databaseInstance) => {
    // Assign database instance to configuration
    configuration.databaseInstance = databaseInstance;
    // serve app!
    serve(configuration).then((wertikApp) => {
      if (configuration.database.dbDialect.includes("sql")) {
        wertikApp.database.sync();
      }
    });
  })
  .catch((e) => {
    console.log(`Error connecting with database`);
    console.log(e);
  });
