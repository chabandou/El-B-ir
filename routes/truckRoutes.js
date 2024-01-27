const express = require("express");
const trucksRouter = express.Router();

const catchAsync = require("../utils/catchAsync.js");
const truckControllers = require("../controllers/trucks.js");
const { validateTruck, isAuthor } = require("../middleware2.js");
const isLoggedIn = require("../middleware.js");
const router = require("./user.js");

const {storage} = require('../cloudinary')
const multer  = require('multer')
const upload = multer({ storage })

trucksRouter
  .route("/")
  .get(truckControllers.renderIndex)
  .post(isLoggedIn,upload.single('truck[image]'), validateTruck, catchAsync(truckControllers.postNewForm));


trucksRouter.get("/new", isLoggedIn, truckControllers.renderNewForm);

trucksRouter
  .route("/:id")
  .get(catchAsync(truckControllers.renderTruck))
  .put(isLoggedIn, isAuthor, upload.single('truck[image]'),validateTruck, catchAsync(truckControllers.updateTruck))
  .delete(isAuthor, catchAsync(truckControllers.deleteTruck));

trucksRouter.get(
  "/:id/edit",
  isAuthor,
  catchAsync(truckControllers.renderEditForm)
);

module.exports = trucksRouter;
