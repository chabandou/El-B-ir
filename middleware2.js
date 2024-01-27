const { truckValidSchema, reviewValidSchema } = require("./schemas.js");
const truck = require("./models/truck.js");
const ExpressError = require("./utils/expressError.js");
const review = require("./models/review");


module.exports.validateTruck = (req, res, next) => {
  const { error } = truckValidSchema.validate(req.body);
  console.log(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    console.log(error);
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const foundTruck = await truck.findById(id);
  if (!req.user || !foundTruck.author.equals(req.user.id)) {
    req.flash("error", "Action inderdite");
    return res.redirect(`/trucks/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, revID } = req.params;
  const foundReview = await review.findById(revID);
  if (!req.user || !foundReview.author.equals(req.user.id)) {
    req.flash("error", "Action inderdite");
    return res.redirect(`/trucks/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewValidSchema.validate(req.body);
  if (error) {
    const message = error.details.map((el) => el.message).join(",");
    throw new ExpressError(error, 400);
  } else {
    next();
  }
};

module.exports.storeReturnTo =  (req, res, next) => {
  if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
  }
  next();
}
