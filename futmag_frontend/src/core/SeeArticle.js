import React, { useState, useEffect } from "react";
// import { getOne } from "./helper/Apicall";
import Imagehelper from "./helper/Imagehelper";
import Menu from "./Menu";
const { API } = require("./../backend");

function SeeArticle() {
  const getOne = () => {
    const id = "60aa2911047aa11844db4434";
    var url = window.location.href;
    url = url.toString();
    const b = url.substring(url.indexOf("/article/") + 9);
    console.log(b);

    console.log(id);
    return fetch(`${API}/${b}`, { method: "GET" })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [art, setArt] = useState([]);
  const [error, setError] = useState("");

  const LoadAllArt = () => {
    getOne().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setArt(data);
      }
    });
  };

  useEffect(() => {
    LoadAllArt();
  }, []);

  const model = ({ article }) => {
    const blogTitle = article ? article.name : "No title";
    const blogDesctiption = article ? article.des : "No description";
    const Date = article ? article.date : "IDK";
    return (
      <div className="card" style={{ width: "100%" }}>
        <Imagehelper article={article} />
        <div className="card-body">
          <h5 className="card-title">{blogTitle}</h5>
          <p className="card-text">{blogDesctiption}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-9">{<div>{model({ article: art })}</div>};</div>
        </div>
      </div>
    </>
  );
}

export default SeeArticle;
