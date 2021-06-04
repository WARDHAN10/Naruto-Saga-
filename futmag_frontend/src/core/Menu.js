import React from "react";
import logo from "../logo.jpg";
import { Link, NavLink, withRouter } from "react-router-dom";
import { isAutheticated, signout } from "../user/authhelper/Helper";
import icon from "../icon.png";
const currentTab = (history, path) => {
  if (history.location.path === path) {
    return { color: "white" };
  } else {
    return { color: "white" };
  }
};
function Menu({ history }) {
  const { user } = isAutheticated();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={icon}
              height="40px"
              width="40px"
              className="mx-3"
              alt=""
            />{" "}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAutheticated() && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Welcome {user.name}
                  </NavLink>
                </li>
              </ul>
            )}

            {!isAutheticated() && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
              </ul>
            )}

            {!isAutheticated() && (
              <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    style={currentTab(history, "/signup")}
                    className="nav-link active"
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    style={currentTab(history, "/signin")}
                    className="nav-link active"
                    to="/signin"
                  >
                    Log in{" "}
                  </NavLink>
                </li>
              </ul>
            )}
            {isAutheticated() && (
              <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    style={currentTab(history, "/create")}
                    className="nav-link active"
                    to="/user/articles"
                  >
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    style={currentTab(history, "/create")}
                    className="nav-link active"
                    to="/user/create"
                  >
                    Create
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={() => {
                      signout(() => {
                        history.push();
                      });
                    }}
                    className="nav-link active"
                    to="/"
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Menu);
