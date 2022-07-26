const express = require("express");
const path = require("path");
const api = require("./rout/externalAPI.js");

const app = express();
//middleware
app.use(express.static(path.join(__dirname, "dist")));
console.log(__dirname);
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

const port = 3000;
app.listen(port, () => console.log("Listening on port:", port));
