const express = require("express");
const app = express();

require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
const MongoStore = require("connect-mongo").default;

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJwt = require("./config/passport-jwt-strategy");
const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: process.env.MONGO_STORE_NAME, //name of cookie
    //todo change the secret before deployment in prod mode
    secret: process.env.MONGO_STORE_SESSION, //when encryption happens the key to encode and decode
    saveUninitialized: false, //
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, //number of minutes  ( in milliseconds)
    },
    // store: MongoStore.create(
    //   {
    //     mongoUrl: "mongodb://localhost/codeial_clone_db", //provide the link of the db
    //   },
    //   function (err) {
    //     //call back fxn if there is an error
    //     console.log(err || "connect mongodb setup ok");
    //   }
    // ),
  })
);
//telling app to use passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// json to xls
const json2xls = require("json2xls");
const fs = require("fs");
var json = [
  {
    foo: "kandari",
    qux: "moo",
    poo: 123,
    stux: new Date(),
  },
  {
    foo: "kandari",
    qux: "moo",
    poo: 123,
    stux: new Date(),
  },
  {
    foo: "kandari",
    qux: "moo",
    poo: 123,
    stux: new Date(),
  },
];

var xls = json2xls(json);

fs.writeFileSync("data.xlsx", xls, "binary");

// another approach

// use the below package to convert json to xls
var json2xls = require("json2xls");

json.forEach(function (instance, indexx, record) {
  var tempArry = {
    ColoumnName1: record[indexx].columnNameVlaue,
    ColoumnName2: record[indexx].columnNameVlaue,
    ColoumnName3: record[indexx].columnNameVlaue,
    ColoumnName4: record[indexx].columnNameVlaue,
  };
  jsonArray.push(tempArry);
});
//this code is for sorting  xls with required value
jsonArray.sort(function (a, b) {
  return parseFloat(b.ColoumnName4) - parseFloat(a.ColoumnName4);
});
var xls = json2xls(jsonArray);

fs.writeFileSync("yourXLName.xlsx", xls, "binary");

app.use("/", require("./routes"));
app.listen(process.env.PORT, function (err) {
  if (err) {
    console.log("error while firing server");
    return;
  }
  console.log("server is running-", process.env.PORT);
});
