import express from "express";
import wertik from "./main";
import { IConfiguration } from "./framework/types/configuration";
const defaultConfiguration: IConfiguration = require("./framework/defaults/defaultConfigurations/defaultConfiguration").default;
const postgresConfiguration: IConfiguration = require("./framework/defaults/defaultConfigurations/postgresConfiguration").default;


let app = express();

wertik({ expressApp: app }, defaultConfiguration).then((p: any) => {
  p.database.sync();
});
