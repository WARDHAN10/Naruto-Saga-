import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { API } from "../backend";
import Blogs from "./Blogs";
import { all, AllTop } from "./helper/Apicall";
import TopArticles from "./TopArticles";

function Home(props) {
  const [art, setArt] = useState([]);
  const [TopArt, setTopArt] = useState([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const LoadAllArt = () => {
    all().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setArt(data);
      }
    });
  };

  const LoadAllTop = () => {
    AllTop().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setTopArt(data);
      }
    });
  };

  useEffect(() => {
    LoadAllArt();
    LoadAllTop();
  }, [reload]);
  return (
    <>
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-9 col-9 mt-5">
            {art.map((art, index) => {
              return (
                <div key={index}>
                  <Blogs article={art} reload={reload} setReload={setReload} />
                </div>
              );
            })}
          </div>
          <div className="col-md-3 dis">
            <h3 className="mx-3 mt-2"> Top Articles</h3>

            {TopArt.map((art, index) => {
              return (
                <div key={index}>
                  <TopArticles article={art} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
