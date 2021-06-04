import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { isAutheticated } from "../user/authhelper/Helper";
import { createBlog } from "./helper/Apicall";

import Menu from "./Menu";

function Create(props) {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    photo: "",
    error: "",
    formData: "",
    blogCreated: "",
    loading: false,
    getredirect: false,
    like: 0,
  });
  //destucture
  const {
    title,
    description,
    photo,
    formData,
    error,
    blogCreated,
    loading,
    getredirect,
    like,
  } = Values;
  const result = [
    title,
    description,
    photo,
    formData,
    error,
    blogCreated,
    loading,
    getredirect,
    like,
  ];

  const { user, token } = isAutheticated();

  useEffect(() => {
    setValues({ ...Values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    setValues({ ...Values, [name]: value });
  };
  const onSubmit = (event) => {
    const { user, token } = isAutheticated();

    event.preventDefault();
    setValues({ ...Values, error: "", loading: true });
    console.log(token);
    formData.set("like", 0);
    formData.set("liked", []);
    createBlog(user._id, token, formData).then((data) => {
      console.log(data);
      if (data && data.error) {
        setValues({ ...Values, error: data.error });
      } else {
        setValues({
          ...Values,
          title: "",
          description: "",
          photo: "",
          loading: false,
          blogCreated: "rock",
          getredirect: true,
          formData: new FormData(),
        });
      }
    });
  };
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: blogCreated ? "" : "none" }}
    >
      Created Successfully
    </div>
  );
  const redirect = () => {
    if (getredirect) {
      return <Redirect to="/user/articles" />;
    }
  };
  const warningMessage = () => (
    <div
      className="alert alert-danger mt-3 create"
      style={{ display: error && !blogCreated ? "" : "none" }}
    >
      Error Creating Blog
    </div>
  );
  const create = () => {
    return (
      <form>
        <div className="container ">
          <div className="row ">
            <div className="col-md-8 col-sm-12 create text-center shadow p-3 mb-5 bg-white rounded">
              <label htmlFor="" className="label">
                Title
              </label>
              <br />
              <input
                type="text"
                onChange={handleChange("title")}
                className="inputTitle"
                value={title}
                required="true"
              />
              <br />
              <label htmlFor="" className="label">
                BODY
              </label>
              <br />
              <textarea
                name="blog"
                id=""
                onChange={handleChange("description")}
                className="inputBody"
                placeholder="write blog here"
                value={description}
                required="true"
              ></textarea>{" "}
              <label
                className="btn btn-dark btn-md btn-block text-white my-3 "
                style={{ width: "100%", float: "left" }}
              >
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file"
                  style={{ float: "left" }}
                />
              </label>
              <br />
              <br />
              <button className="btn btn-success" onClick={onSubmit}>
                DONE
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <>
      <Menu />
      {redirect()}
      {successMessage()}
      {warningMessage()}
      {create()}
    </>
  );
}

export default Create;
