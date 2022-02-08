import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import { Link, useLocation } from "react-router-dom";
import SingleArticle from "../components/SingleArticle";
import uuid from "react-uuid";
import Banner from "../components/Banner";

const SingleTracePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { trace } = useSelector((state) => state.traces);

  const location = useLocation();
  console.log(JSON.stringify(location.pathname));
  let locationId = location.pathname.substring(7);
  let thisTrace = trace.filter((obj) => {
    return obj.id === parseInt(locationId);
  });
  let thisArticleId = [];

  if (thisTrace[0]) {
    for (let id of thisTrace[0].attributes.articles.data) {
      thisArticleId.push({ id: id.id });
      console.log(thisArticleId);
    }
  }

  return (
    <div className="single-page-trace">
      <Banner subTitle={thisTrace[0] !== undefined && thisTrace[0].attributes.title} />
      {thisTrace[0] !== undefined && <h2>{thisTrace[0].attributes.title}</h2>}
      {thisTrace[0] !== undefined && <p>{thisTrace[0].attributes.introduction}</p>}
      {thisArticleId.map((thisArticleId) => (
        <SingleArticle title={thisArticleId} key={uuid()} />
      ))}
    </div>
  );
};

export default SingleTracePage;
