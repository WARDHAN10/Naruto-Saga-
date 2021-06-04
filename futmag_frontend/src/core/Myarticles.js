import React, { useEffect, useState } from "react";
import { isAutheticated } from "../user/authhelper/Helper";
import { geMyArt, removeOne } from "./helper/Apicall";
import Menu from "./Menu";
import { Link } from "react-router-dom";

function Myarticles(props) {
  const [art, setArt] = useState([]);
  const [error, setError] = useState("");
  const { user, token } = isAutheticated();
  const LoadAllArt = () => {
    geMyArt(user._id, token).then((data) => {
      console.log(data);
      if (data && data.error) {
        setError(data.error);
      } else {
        setArt(data);
      }
    });
  };
  useEffect(() => {
    LoadAllArt();
  }, []);

  const deleteMyArt = (articleId) => {
    removeOne(user._id, token, articleId).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        LoadAllArt();
      }
    });
  };

  const empty = () => {
    return (
      art == "" && (
        <h1 className="text-center mt-5 text-secondary">No articles</h1>
      )
    );
  };

  const MyArtModel = ({ articles, index }) => {
    const articleno = index + 1;
    return (
      <div className="card">
        <div className="card-header bg-dark text-white">
          Article {articleno}
        </div>
        <div className="card-body">
          <h5 className="card-title">{articles.title}</h5>
          <p className="card-text">{articles.date}</p>
          <Link
            to={`article/${articles._id}`}
            className="btn btn-outline-info mx-1"
          >
            Read
          </Link>
          <Link
            to={`/user/edit/${articles._id}/${user._id}`}
            className="btn btn-outline-warning mx-1"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              deleteMyArt(articles._id);
            }}
            className="btn btn-outline-danger mx-1"
          >
            Remove
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Menu />
      <div>
        {empty()}
        {art.map((art, index) => {
          return (
            <div key={index}>
              <MyArtModel index={index} articles={art} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Myarticles;
