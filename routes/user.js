const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

const userControllers = require("../controllers/users");
const { storeReturnTo } = require("../middleware2");

const passportAuth = passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login",
});

router
  .route("/register")
  .get(userControllers.renderRegister)
  .post(catchAsync(userControllers.register));

router
  .route("/login")
  .get(userControllers.renderLogin)
  .post(storeReturnTo, passportAuth, userControllers.login);

router.get("/logout", userControllers.logout);

module.exports = router;
