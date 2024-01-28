const User = require("../models/user");

module.exports = {
  renderRegister: (req, res) => {
    res.render("auth/register");
  },
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const newUser = await User.register(user, password);
      req.login(newUser, (e) => {
        if (e) return next(e);
        req.flash("success", "Bienvenue dans The Well");
        res.redirect("/trucks");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  },
  renderLogin: (req, res) => {
    res.render("auth/login.ejs");
  },
  login: (req, res) => {
    req.flash("success", `Bon retour, ${req.body.username}!`);
    const redirectUrl = res.locals.returnTo || "/trucks";
    res.redirect(redirectUrl);
  },
  logout: (req, res, next) => {
    req.logout((e) => {
      if (e) {
        return next(e);
      }
      req.flash("success", "Déconnecté avec succès.");
      res.redirect("/trucks");
    });
  },
};
