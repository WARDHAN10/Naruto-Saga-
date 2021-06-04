const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const articleroute = require("./routes/article");
const authroute = require("./routes/auth");
const userroute = require("./routes/user");
//.env in use
require("dotenv").config();
//default/obvious middleware
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

app.use("/blog", authroute);
app.use("/blog", userroute);
app.use("/blog", articleroute);

mongoose
  .connect(
    process.env.DATABASE ||
      "mongodb+srv://solanki:harsh@cluster0.81sh6.mongodb.net/blog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
  });

//serve static asset if we are in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("futmag_frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "futmag_frontend", "build", "index.html")
    );
  });
}

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT);
