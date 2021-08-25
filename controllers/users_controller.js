const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", { title: "profile", profile_user: user });
  });
};

module.exports.update = function (req, res) {
  if (user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      console.log("user updated");
      res.redirect("/");
    });
  } else {
    console.log("not auth");
    res.redirect("back");
  }
};

module.exports.signUp = function (req, res) {
  return res.render("signUp", { title: "signUp" });
};
module.exports.signIn = function (req, res) {
  return res.render("signIn", { title: "signIn" });
};

module.exports.signOut = function (req, res) {
  req.logout();
  return res.redirect("/");
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

module.exports.createSession = function (req, res) {
  res.redirect("/");
};
