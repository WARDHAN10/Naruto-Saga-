import React from "react"
import {Route,Redirect} from "react-router-dom"

const isAutheticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
  
export default function PrivateRoute({ component :Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            isAutheticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }