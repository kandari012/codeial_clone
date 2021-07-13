const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.end("profile");
};

module.exports.signUp = function (req, res) {
  return res.render("signUp", { title: "signUp" });
};
module.exports.signIn = function (req, res) {
  return res.render("signIn", { title: "signIn" });
};

//create new user
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("password not match");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error while finding user in DB");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error while finding user in DB");
          return;
        }
        console.log("user created");
        return res.redirect("/users/signIn");
      });
    } else {
      console.log("user exist");
      return res.redirect("back");
    }
  });
};
