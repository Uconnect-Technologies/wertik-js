import express from "express";
import wertik from "./main";
import defaultConfiguration from "./framework/defaults/defaultConfiguration";

let app = express();

wertik({
    expressApp: app
}, defaultConfiguration).then((p: any) => {
    p.seeds().then((e) => {
        console.log("Message from seeds", e);
    });
})