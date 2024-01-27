const truck = require("../models/truck");
const review = require("../models/review");


module.exports = {
    postReview: async (req, res) => {
        const { id } = req.params;
        const foundTruck = await truck.findById(id);
        const newReview = new review(req.body.review);
        newReview.author = req.user._id;
        foundTruck.reviews.push(newReview);
        await newReview.save();
        await foundTruck.save();
        req.flash("success", "Avis ajouté!");
        res.redirect(`/trucks/${foundTruck._id}`);
      },
      deleteReview: async (req, res) => {
        const { id, revID } = req.params;
        await truck.findByIdAndUpdate(id, { $pull: { reviews: revID } });
        await review.findByIdAndDelete(revID);
        req.flash("success", "Avis Supprimé!");
        res.redirect(`/trucks/${id}`);
      }
}
