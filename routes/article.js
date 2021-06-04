const express = require("express");
const router = express.Router();
const { getUserById } = require("../controller/user");
const { isSignIn, isAuthenticate } = require("../controller/auth");
const {
  getArticleId,
  createArticle,
  getArticle,
  updateArticle,
  removeArticle,
  getAllArticle,
  getPhoto,
  likeArticle,
  UnlikeArticle,
  getAllTitle,
} = require("../controller/article");

router.param("userId", getUserById);
router.param("articleId", getArticleId);

//create
router.post("/create/:userId", isSignIn, isAuthenticate, createArticle);
//read
router.get("/:articleId", getArticle);
router.get("/a/all", getAllArticle);
router.get("/photo/:articleId", getPhoto);
router.get("/b/topArticles", getAllTitle);
//update
router.put("/:articleId/:userId", isSignIn, isAuthenticate, updateArticle);
router.put("/like/:articleId/:userId", isSignIn, isAuthenticate, likeArticle);

router.put(
  "/unlike/:articleId/:userId",
  isSignIn,
  isAuthenticate,
  UnlikeArticle
);

//delete
router.delete("/:articleId/:userId", isSignIn, isAuthenticate, removeArticle);

module.exports = router;
