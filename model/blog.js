const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      require: true,
      maxlength: 3000,
    },
    user: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    like: {
      type: Number,
    },
    liked: [{ type: String }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Blog", BlogSchema);
