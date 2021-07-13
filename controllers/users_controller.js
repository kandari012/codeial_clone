const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/users/signIn");
  } else {
    User.findOne({ email: req.cookies.user_id }, function (err, user) {
      if (err) {
        console.log("error while finding user in DB");
        return;
      }
      return res.render("profile", { title: "profile", user: user });
    });
  }
};

module.exports.signUp = function (req, res) {
  if (!req.cookies.user_id) {
    return res.render("signUp", { title: "signUp" });
  } else {
    return res.redirect("/users/profile");
  }
};
module.exports.signIn = function (req, res) {
  if (!req.cookies.user_id) {
    return res.render("signIn", { title: "signIn" });
  } else {
    return res.redirect("/users/profile");
  }
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

//create session

module.exports.createSession = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error while finding user in DB");
      return;
    }
    if (!user) {
      console.log("user or password incorrect");
      return res.redirect("/users/signUp");
    } else {
      if (user.password != req.body.password) {
        console.log(
          "password incorrect ",
          user.password,
          user.email,
          req.body.email
        );
        return res.redirect("/users/signUp");
      }
      res.cookie("user_id", user.email);
      return res.redirect("/users/profile");
    }
  });
};
