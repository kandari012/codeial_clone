const express = require("express");
const app = express();
const port = 8000;
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(expressLayout);
app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("error while firing server");
    return;
  }
  console.log("server is running");
});
