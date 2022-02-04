import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import ReactMarkdown from "react-markdown";

const SingleArticle = ({ title }) => {
  const { articles } = useSelector((state) => state.traces);
  console.log(articles);
  console.log(title);
  var thisSingleArticle = articles.filter((obj) => {
    return obj.id === title.id;
  });
  console.log(thisSingleArticle);
  let thisTitle = thisSingleArticle[0].attributes.title;
  let thisSubTitle = thisSingleArticle[0].attributes.subtitle;
  let thisAuthor = thisSingleArticle[0].attributes.author;
  console.log(thisSingleArticle[0].attributes.type);
  let contentList = thisSingleArticle[0].attributes.type;

  return (
    <div>
      <div className="single-article">
        <h2>{thisTitle}</h2>
        <h3>{thisSubTitle}</h3>
        <p>{thisAuthor}</p>
        {contentList.map((contentList) => {
          if (contentList.text) {
            return <ReactMarkdown>{contentList.text}</ReactMarkdown>;
          }
        })}
      </div>
    </div>
  );
};

export default SingleArticle;
