import "../styles/app.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import { useLocation } from "react-router-dom";
import SingleArticle from "../components/SingleArticle";
import uuid from "react-uuid";
import Banner from "../components/Banner";
import { motion, AnimateSharedLayout } from "framer-motion";
import { Link } from "react-router-dom";

import Toggle from "../components/Toggle";

const SingleTracePage = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { trace, slide } = useSelector((state) => state.traces);

  const location = useLocation();
  let locationId = location.pathname.substring(7);
  let thisTrace = trace.filter((obj) => {
    return obj.id === parseInt(locationId);
  });
  let thisArticleId = [];
  let contributions;
  const colorBackground = [];

  if (thisTrace[0]) {
    contributions = thisTrace[0].attributes.public_contribution;

    for (let id of thisTrace[0].attributes.articles.data) {
      thisArticleId.push({ id: id.id });
    }
    for (let i = 0; i < thisTrace[0].attributes.articles.data.length + 2; i++) {
      let color = Math.random() * 360;
      colorBackground.push(color);
    }
  }

  const colorTop = colorBackground[1];
  const colorEnd = colorBackground[colorBackground.length - 1];
  console.log(colorEnd);

  const styleTop = {
    backgroundColor: "hsl(" + colorTop + ", 100%, 50%)",
  };
  const styleEnd = {
    backgroundColor: "hsl(" + colorEnd + ", 100%, 50%)",
  };

  return (
    <div layout style={styleTop} className="single-page-trace">
      <Banner link={"/"} subTitle={thisTrace[0] !== undefined && thisTrace[0].attributes.title} />
      <div className="content-wrapper">
        <div className="content">
          <div style={styleTop} className="intro">
            {thisTrace[0] !== undefined && <h2> Introduction to {thisTrace[0].attributes.title}</h2>}
            <AnimateSharedLayout>
              {thisTrace[0] !== undefined && <motion.p layout>{thisTrace[0].attributes.introduction}</motion.p>}
            </AnimateSharedLayout>
          </div>

          {thisArticleId.map((thisArticleId, index) => (
            <SingleArticle index={index} colorBackground={colorBackground} slide={slide} title={thisArticleId} key={uuid()} />
          ))}
          <div>
            {contributions && (
              <Link to={"/contribution/" + locationId}>
                <div style={styleEnd} className="contribute">
                  <p className="plus">+</p>
                  <p>contribute to this room by adding a new work</p>
                </div>
              </Link>
            )}
            {!contributions && <div className="ending"></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTracePage;
