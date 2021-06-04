var express = require("express");
var router = express.Router();
const { signin, signout, signup, isSignIn } = require("../controller/auth");
const { check } = require("express-validator");

//creating the user
router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "password length").isLength({ min: 3 }),
  ],
  signup
);
//logged in user
router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "password length").isLength({ min: 1 }),
  ],
  signin
);
//signout user
router.get("/signout", signout);

// router.get("/testroute", isSignIn, (req, res) => {
//   res.send("the route is protected");
// });
module.exports = router;
