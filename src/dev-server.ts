import wertick from "./main";

let a = wertick.run({
  name: "Wapgee",
  mode: "development",
  port: "1200",
  jwtSecret: "kakoilyas",
  dbUsername: "root",
  dbPassword: "",
  dbName: "graphql",
  dbHost: "localhost",
  dbMysqlSync: true,
  dbPort: "3306",
  logging: "false",
  allowGraphql: "TRUE",
  modulesEnabled: " ",
  predefinedModules: "user,forgetPassword,permission,role,rolePermission,userRole,profile,auth",
  dialect: "MYSQL",
  mongoURI: "mongodb://ilyas:pass1234@ds027719.mlab.com:27719/graphql",
  mailerService: "gmail",
  mailerServiceUsername: "jangonewsmailer@gmail.com",
  mailerServicePassword: "jango/12345",
  backendApp: "http://localhost:1200",
  frontendAppUrl: "http://localhost:3000",
  frontendAppPasswordResetUrl: "/reset-password/"
});

a.then(app => {
  console.log("Server is up now yeah");
});
