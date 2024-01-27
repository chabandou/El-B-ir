const { string } = require("joi");
const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  fileName: String,
})

imageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/upload', '/upload/w_300')
})
const truckSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ["Naturel", "Filtrée"],
  },
  price: Number,
  location: String,
  phone: Number,
  image: imageSchema,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
});

truckSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

const truck = mongoose.model("truck", truckSchema);

module.exports = truck;
