const User = require("../model/user");
const Blog = require("../model/blog");
exports.getUserById = (req, res, next, id) => {
  //middle ware finding the user by id
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "no user FOUND",
      });
    }
    //saving the user into profile which will created in the front end

    req.profile = user;
    next();
  });
};

exports.updateUser = (req, res) => {
  //middle ware finding the user by id
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "no user FOUND",
        });
      }

      //we dont want salt and encry password to visible to the world
      req.profile.salt = undefined;
      req.profile.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  //to check the the above middleware that it is returning the right value or not
  return res.json(req.profile);
};

exports.getUserAtricles = (req, res) => {
  const blogData = Blog.find({
    user: req.params.userId,
  }).exec((err, articles) => {
    if (err) {
      return res.status(400).json({
        error: "Falied to get all article",
      });
    }
    res.json(articles);
    console.log(articles);
  });
};
