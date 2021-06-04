import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user/authhelper/Helper";
import { like, unlike } from "./helper/Apicall";
import Imagehelper from "./helper/Imagehelper";
import SeeArticle from "./SeeArticle";

function Blogs({ article, setReload = (f) => f, reload = undefined }) {
  const blogTitle = article ? article.title : "No title";
  var blogDesctiption = article ? article.description : "No description";
  const displayContent = blogDesctiption.substr(0, 200);
  const [bg, setBg] = useState("");

  const { user, token } = isAutheticated();
  var Like = article.liked;

  if (isAutheticated()) {
  }
  const Check = isAutheticated() ? Like.includes(user._id) : false;
  const checkLike = () => {
    if (Check) {
      setBg("red");
    } else {
      setBg("black");
    }
  };
  useEffect(() => {
    checkLike();
  }, []);
  return (
    <div>
      <div className="card" style={{ width: "100%" }}>
        <Imagehelper article={article} />
        <div className="card-body">
          <hr />
          <h5 className="card-title">{blogTitle}</h5>
          <p className="card-text">{displayContent}</p>
          <Link
            to={`article/${article._id}`}
            className="btn btn-dark text-white"
          >
            read More...
          </Link>
          {isAutheticated() && (
            <span>
              <button
                style={{ border: "none", background: "white", color: bg }}
                onClick={() => {
                  if (bg == "black") {
                    setBg("red");
                    like(user._id, token, article._id).then((data) => {
                      console.log(data);
                      if (data && data.error) {
                        console.error(data.error);
                      } else {
                        console.log(data);
                      }
                      setReload(!reload);
                    });
                  } else {
                    setBg("black");
                    unlike(user._id, token, article._id).then((data) => {
                      console.log(data);
                      if (data && data.error) {
                        console.error(data.error);
                      } else {
                        console.log(data);
                      }
                      setReload(!reload);
                    });
                  }
                }}
              >
                <i className="fas fa-heart"></i>
              </button>
              {article.like}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
