let wertick = require("./build/main.js");

wertick.default.run({
    NAME: "Wapgee",
    MODE: "development",
    PORT: 1200,
    JWT_SECRET: "v1s4LIGdBu",
    DB_USERNAME: "root",
    DB_PASSWORD: "root",
    DB_NAME: "graphql",
    DB_HOST: "localhost",
    DB_PORT: 3306,
    LOGGING: false,
    ALLOW_GRAPHQL: "TRUE",
    MODULES_ENABLED: " ",
    PREDEFINED_MODULES: "user,forgetPassword,permission,role,rolePermission,userRole,userPermission,profile,auth",
});