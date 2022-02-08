import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
// Components
import Trace from "../components/Trace";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import uuid from "react-uuid";
import Lounge from "./Lounge";
import Banner from "../components/Banner";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { trace, articles, chatrooms, vision, visionary } = useSelector((state) => state.traces);
  console.log(trace);
  return (
    <div className="home">
      <Banner />
      <div className="home-links-container">
        <Link to="labyrinth">
          <div key={uuid()} className="title-box">
            <div className="title-box-background"></div>
            <h3 className="title-intro">Enter</h3>
          </div>
        </Link>
        {trace.map((trace) => (
          <Link key={uuid()} to={"/trace/" + trace.id}>
            <Trace title={trace.attributes.title} />
          </Link>
        ))}
        <Link to="/lounge">
          <div className="title-box">
            <div className="title-box-background"></div>
            <h3 className="title-intro">Lounge</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
