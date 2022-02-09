import "../styles/app.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";
import { motion, AnimateSharedLayout } from "framer-motion";
import Toggle from "./Toggle";

const SingleArticle = ({ title }) => {
  const { articles } = useSelector((state) => state.traces);
  var thisSingleArticle = articles.filter((obj) => {
    return obj.id === title.id;
  });
  let thisTitle = thisSingleArticle[0].attributes.title;
  let thisSubTitle = thisSingleArticle[0].attributes.subtitle;
  let thisAuthor = thisSingleArticle[0].attributes.author;
  let contentList = thisSingleArticle[0].attributes.type;

  return (
    <div>
      <div className="single-article">
        <AnimateSharedLayout>
          <Toggle thisSubTitle={thisSubTitle} thisTitle={thisTitle}>
            <div className="article-content">
              {contentList.map((contentList) => {
                if (contentList.text) {
                  return <ReactMarkdown key={uuid()}>{contentList.text}</ReactMarkdown>;
                }
              })}
              <p>{thisAuthor}</p>
            </div>
            <div className="block"></div>
          </Toggle>
        </AnimateSharedLayout>
      </div>
    </div>
  );
};

export default SingleArticle;
