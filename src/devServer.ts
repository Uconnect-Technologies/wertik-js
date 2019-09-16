import express from "express";
import wertik from "./main";

let app = express();

wertik(app, {
    name: "Wertik",
    builtinModules: "user"
});