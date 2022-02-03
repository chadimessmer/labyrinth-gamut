import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
// Components
import Trace from "../components/Trace";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Lounge from "./Lounge";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { trace, articles, chatrooms, vision, visionary } = useSelector((state) => state.traces);
  console.log(trace);
  return (
    <div className="home">
      <h1 className="home-title">LABYRINTH</h1>
      <div className="home-links-container">
        <Link to="labyrinth">
          <div className="title-box">
            <div className="title-box-background"></div>
            <h3 className="title-intro">Enter</h3>
          </div>
        </Link>
        {trace.map((trace) => (
          <Link to={trace.attributes.title}>
            <Trace title={trace.attributes.title} key={trace.id} />
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
