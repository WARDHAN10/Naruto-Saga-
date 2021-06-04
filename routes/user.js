const express = require("express");
const router = express.Router();
const { isAdmin, isAuthenticate, isSignIn } = require("../controller/auth");
const {
  getUser,
  getUserById,
  updateUser,
  getUserAtricles,
} = require("../controller/user");

//making a prameter to pass it into the route
router.param("userId", getUserById);
//check user is 1.signed in 2. is authenticated ,then only get the user
// router.get("/user/:userId", isSignIn, isAuthenticate, getUser);
router.get("/user/:userId/articles", isSignIn, isAuthenticate, getUserAtricles);

router.put("/user/:userId", isSignIn, isAuthenticate, updateUser);

module.exports = router;
