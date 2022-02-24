import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
// Components
import Trace from "../components/Trace";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Banner from "../components/Banner";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { trace, articles, chatrooms, vision, visionary } = useSelector((state) => state.traces);
  console.log(trace);
  document.body.style.overflow = "auto";
  trace.sort((a, b) => {
    return a.id - b.id; //this will sort according to .id descending
  });

  let lien = "/";
  return (
    <div className="home">
      <Banner link={lien} />
      <div className="home-links-container">
        <Link to="labyrinth">
          <div className="enter-container">
            <div key={uuid()} className="title-box-enter">
              <div className="enter-box-background">
                <div className="back-one"></div>
                <div className="back-two"></div>
                <div className="back-three"></div>
                <div className="back-four"></div>
              </div>
              <h3 className="title-intro">Enter</h3>
            </div>
          </div>
        </Link>

        {trace.map((trace, index) => (
          <Link key={uuid()} to={"/trace/" + trace.id}>
            <Trace index={index} title={trace.attributes.title} />
          </Link>
        ))}
        <Link to="/lounge">
          <div className="lounge-container">
            <div className="title-box">
              <div className="title-box-background lounge-intro"></div>
              <h3 className="title-intro lounge-text">Lounge</h3>
            </div>
          </div>
        </Link>
      </div>
      <div className="newsletter">
        <a href="#">NEWSLETTER</a>
      </div>
    </div>
  );
};

export default Home;
