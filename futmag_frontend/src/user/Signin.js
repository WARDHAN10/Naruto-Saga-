import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "./authhelper/Helper";
import "../styles.css";

function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  //destructuring the data

  const { email, password, error, loading, didRedirect } = values;

  //desctrucure the user

  const { user } = isAutheticated();
  //loading message

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
    );
  };
  //error message
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger "
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };
  //perform redirect when successfull
  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }

    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };
  //handle Change method
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //onsubmit
  const onSubmit = (event) => {
    try {
      event.preventDefault();
      setValues({ ...values, error: false, loading: true });
      signin({ email, password })
        .then((data) => {
          if (data && data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true,
              });
            });
          }
        })
        .catch(() => console.log("Error in signin"));
    } catch (err) {
      console.log(err);
    }
  };

  const signinForm = () => {
    return (
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              Application
              <br /> Login Page
            </h2>
            <p>Login or register from here to access.</p>
            <Link className="Home" to="/">
              {" "}
              Home
            </Link>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              <form>
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    onChange={handleChange("email")}
                    value={email}
                    type="text"
                    className="form-control my-1"
                    placeholder="User Name"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    onChange={handleChange("password")}
                    value={password}
                    type="password"
                    className="form-control my-1"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="btn btn-black my-1 mx-1 text-white"
                >
                  Login
                </button>
                <Link
                  to="/signup"
                  type="submit"
                  className="btn btn-secondary my-1 mx-1"
                >
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
    </div>
  );
}

export default Signin;
