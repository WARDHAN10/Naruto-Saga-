import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "./authhelper/Helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    try {
      event.preventDefault();
      setValues({ ...values, error: false });
      signup({ name, email, password })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              error: "",
              success: true,
            });
          }
        })
        .catch(() => console.log("Error in signup"));
    } catch (err) {
      console.log(err);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mx-5"
        style={{ display: success ? "" : "none" }}
      >
        New account is created Successfully.Please
        <Link className="btn btn-sm btn-success mx-2" to="/signin">
          LOGIN HERE
        </Link>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {" "}
        {error}
      </div>
    );
  };

  const signupFrom = () => {
    return (
      <div>
        <div className="sidenav">
          <div className="login-main-text">
            <h2>
              Application
              <br /> Register Page
            </h2>
            <p>Register from here to access.</p>
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
                  <label>Name</label>
                  <input
                    onChange={handleChange("name")}
                    value={name}
                    type="text"
                    className="form-control my-1"
                    placeholder=" Name Here..."
                  />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
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
                  onClick={onSubmit}
                  type="submit"
                  className="btn btn-secondary my-1 mx-1"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {successMessage()}
      {errorMessage()}
      {signupFrom()}
    </div>
  );
};
export default Signup;
