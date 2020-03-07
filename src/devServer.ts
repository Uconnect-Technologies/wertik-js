import express from "express";
import wertik from "./main";
import defaultConfiguration from "./framework/defaults/defaultConfigurations/defaultConfiguration";
import postgresConfiguration from "./framework/defaults/defaultConfigurations/postgresConfiguration";

let app = express();

wertik({ expressApp: app }, postgresConfiguration).then((p: any) => {
  p.database.sync();
});
