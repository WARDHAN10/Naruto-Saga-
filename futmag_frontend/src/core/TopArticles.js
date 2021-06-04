import React from "react";
import { Link } from "react-router-dom";

function TopArticles({ article }) {
  const blogTitle = article ? article.title : "No title";
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title">{blogTitle}</h6>

        <hr />
        <Link
          to={`article/${article._id}`}
          className="btn btn-md btn-dark text-white"
        >
          READ{" "}
        </Link>
      </div>
    </div>
  );
}

export default TopArticles;
