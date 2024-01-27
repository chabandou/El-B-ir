const truck = require("../models/truck.js");
const waterTypes = ["Naturel", "Filtrée"];
const { cloudinary } = require("../cloudinary");

module.exports.renderIndex = async (req, res) => {
  const trucks = await truck.find({});
  res.render("trucks/index", { trucks });
};

module.exports.renderNewForm = (req, res) => {
  res.render("trucks/new", { waterTypes });
};

module.exports.postNewForm = async (req, res, next) => {
  const newTruck = new truck(req.body.truck);
  newTruck.author = req.user._id;
  newTruck.image.url = req.file.path;
  newTruck.image.fileName = req.file.filename;
  await newTruck.save();
  console.log(newTruck);
  req.flash("success", "Fournisseur ajouté!");
  res.redirect(`/trucks/${newTruck._id}`);
};
module.exports.renderTruck = async (req, res) => {
  const { id } = req.params;
  const foundTruck = await truck
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!foundTruck) {
    req.flash("error", "Oh Non, Echec s'est produite! La Page n'existe pas.");
    res.redirect("/trucks");
  }
  res.render("trucks/details", { foundTruck });
};
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const foundTruck = await truck.findById(id);
  if (!foundTruck) {
    req.flash("error", "Oh Non, Echec s'est produite! La Page n'existe pas.");
    res.redirect("/trucks");
  }
  res.render("trucks/edit", { foundTruck, waterTypes });
};
module.exports.updateTruck = async (req, res) => {
  const { id } = req.params;
  // const foundTruck = await truck.findById(id)
  // if (!foundTruck.author.equals(req.use._id)) {
  //   req.flash('error', "Action inderdite")
  //   res.redirect('/trucks')
  // }
  const updatedTruck = await truck.findByIdAndUpdate(id, {
    ...req.body.truck,
  });
  if (updatedTruck.image && req.file) {
    await cloudinary.uploader.destroy(updatedTruck.image.fileName);
  }
  if (updatedTruck.image) {
    updatedTruck.image.url = req.file.path;
    updatedTruck.image.fileName = req.file.filename;
  } else {
    updatedTruck.image = {
      url: req.file.path,
      fileName: req.file.filename
    }
  }
  await updatedTruck.save();
  req.flash("success", "Fournisseur Modifié!");
  res.redirect(`/trucks/${updatedTruck._id}`);
};
module.exports.deleteTruck = async (req, res) => {
  const { id } = req.params;
  await truck.findByIdAndDelete(id);
  req.flash("success", "Fournisseur Supprimé.");

  res.redirect("/trucks");
};
// module.exports.
// module.exports.
