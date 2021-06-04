const Blog = require("../model/blog");
const User = require("../model/user");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");
const { title } = require("process");
const { sortBy } = require("lodash");

//get ID
exports.getArticleId = (req, res, next, id) => {
  Blog.findById(id)
    .populate("user")
    .exec((err, article) => {
      if (err) {
        return res.status(400).json({
          error: "no article found by this id",
        });
      }
      req.article = article;
      next();
    });
};
//GET SINGLE
exports.getArticle = (req, res) => {
  req.article.photo = undefined;
  return res.json({
    _id: req.article._id,
    des: req.article.description,
    name: req.article.title,
    date: req.article.createdAt,
  });
};

//CREATE
exports.createArticle = (req, res) => {
  let form = new formidable.IncomingForm();
  form.KeepExtensions = true;

  form.parse(req, (err, field, file) => {
    if (err) {
      res.status(400).json({
        error: "problem with image",
      });
    }

    const { title, description, like } = field;
    if (!description || !title) {
      return res.status(400).json({
        error: "please enter all the feild",
      });
    }

    let article = new Blog(field);
    article.user = req.params.userId;
    console.log("this is the user", article.user);
    //handle file here

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "image size is greater than 3 MB",
        });
      }
      //getting the path of the photo
      article.photo.data = fs.readFileSync(file.photo.path);
      //getting the type of the file eg,png,jpg
      article.photo.contentType = file.photo.type;
    }
    console.log(article);
    //save to DB

    article.save((err, article) => {
      if (err) {
        return res.status(400).json({
          error: "failed to store the image",
        });
      }
      res.json(article);
    });
  });
};

//update

exports.updateArticle = (req, res) => {
  let form = new formidable.IncomingForm();
  form.KeepExtensions = true;

  form.parse(req, (err, field, file) => {
    if (err) {
      res.status(400).json({
        error: "problem with image",
      });
    }

    const { title, description } = field;

    let article = req.article;
    article = _.extend(article, field);

    //handle file here

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "image size is greater than 3 MB",
        });
      }
      //getting the path of the photo
      article.photo.data = fs.readFileSync(file.photo.path);
      //getting the type of the file eg,png,jpg
      article.photo.contentType = file.photo.type;
    }
    console.log(article);
    //save to DB
    article.save((err, article) => {
      if (err) {
        return res.status(400).json({
          error: "updation of the article failed",
        });
      }
      res.json(article);
    });
  });
};
//delete
exports.removeArticle = (req, res) => {
  let article = req.article;
  article.remove((err, deletedarticle) => {
    if (err) {
      res.status(400).json({
        error: "failed to delete the article",
      });
    }
    res.json({
      message: "deletion successfull",
      deletedarticle,
    });
  });
};

exports.likeArticle = (req, res) => {
  let article = req.article;
  article.like += 1;
  if (!article.liked.includes(req.params.userId)) {
    article.liked.push(req.params.userId);
  }
  console.log("no of like:", article);
  article.save((err, article) => {
    if (err) {
      return res.status(400).json({
        error: "updation of the like failed",
      });
    }
    res.json({
      message: "this is article",
      article,
    });
  });
};

exports.UnlikeArticle = (req, res) => {
  let article = req.article;
  if (article.liked.includes(req.params.userId)) {
    article.liked.splice(req.params.userId, 1);
  }
  article.like -= 1;
  article.save((err, article) => {
    if (err) {
      return res.status(400).json({
        error: "updation of the dislike failed",
      });
    }
    res.json(article);
  });
};

//getall titles

exports.getAllTitle = (req, res) => {
  Blog.find()
    .select("-photo -description -user -createdAt -updatedAt -liked ")
    .sort([["like", "-1"]])
    .limit(5)
    .exec((err, article) => {
      if (err) {
        return res.status(400).json({
          error: "falied to get titles",
        });
      }

      res.json(article);
    });
};

//GETALL
exports.getAllArticle = (req, res) => {
  //using parseInt as every thing comes as a string so convert in into integer
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Blog.find()

    .populate("user")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, article) => {
      if (err) {
        return res.status(400).json({
          error: "Falied to get all article",
        });
      }
      res.json(article);
      console.log(article);
    });
};

exports.getPhoto = (req, res, next) => {
  if (req.article.photo.data) {
    res.set("Content-Type", req.article.photo.contentType);
    return res.send(req.article.photo.data);
  }
  next();
};
