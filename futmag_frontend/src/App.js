import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./auth/prvateRoutes";
import Create from "./core/Create";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import "./styles.css";
import SeeArticle from "./core/SeeArticle";
import Myarticles from "./core/Myarticles";
import UpdateArticle from "./core/UpdateArticle";
function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/article/:articleId" exact component={SeeArticle} />
        <PrivateRoute path="/user/create" exact component={Create} />
        <PrivateRoute path="/user/articles" exact component={Myarticles} />
        <PrivateRoute path="/user/article/all" exact component={Create} />
        <PrivateRoute
          path="/user/article/:articleId"
          exact
          component={SeeArticle}
        />
        <PrivateRoute
          path="/user/edit/:articleId/:userId"
          exact
          component={UpdateArticle}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
