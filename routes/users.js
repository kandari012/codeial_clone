const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("passport");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);
router.post("/update/:id", usersController.update);

router.get("/signIn", passport.checkNotAuthentication, usersController.signIn);
router.get("/signUp", passport.checkNotAuthentication, usersController.signUp);
router.post("/create", usersController.create);
router.get("/signOut", usersController.signOut);
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/signIn" }),
  usersController.createSession
);
module.exports = router;
