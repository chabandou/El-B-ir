const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash("error", "Vous devez être connecté pour faire cette action.");
      return res.redirect("/login");
    }
    next();
  };

module.exports = isLoggedIn 
