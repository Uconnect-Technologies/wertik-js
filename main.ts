"use strict";
exports.__esModule = true;
var express_1 = require("express");
var index_js_1 = require("./framework/graphql/index.js");
var morgan_1 = require("morgan");
var app = express_1["default"]();
app.use(morgan_1["default"]('combined'));
index_js_1["default"](__dirname, app);
app.listen(4000, function () { return console.log("Listening server on localhost:4000/graphql"); });
