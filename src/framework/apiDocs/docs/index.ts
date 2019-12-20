import {IDocServerConfiguration} from "./../../types/configuration"
import express from "express";
import path from "path";
const port = 5200;
const app = express();
import {get} from "lodash";

export default function (options: IDocServerConfiguration, cb: Function) {
  const port = get(options,'port',5200);
  app.use(express.static('index'));
  app.use(express.static(path.join(__dirname, '/')));
  app.get("/",function (req,res) {
    res.sendFile('./index.html', { root: __dirname });
  });
  app.listen(port, function () {
    console.log(`Rest API docs running at http://localhost:${port}/`);
    cb();
  })
}