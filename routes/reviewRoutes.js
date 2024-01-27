const express = require("express");
const reviewsRouter = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const reviewControllers = require('../controllers/reviews.js')


const { isReviewAuthor, validateReview } = require("../middleware2.js");
const isLoggedIn = require("../middleware.js");

reviewsRouter.post(
  "/",
  validateReview,
  isLoggedIn,
  catchAsync(reviewControllers.postReview)
);

reviewsRouter.delete(
  "/:revID",
  isReviewAuthor,
  catchAsync(reviewControllers.deleteReview)
);

module.exports = reviewsRouter;
