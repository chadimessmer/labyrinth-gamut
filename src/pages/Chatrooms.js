import "../styles/app.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import Banner from "../components/Banner";

const Chatroom = () => {
  const dispatchVision = useDispatch();
  useEffect(() => {
    dispatchVision(loadTraces());
  }, [dispatchVision]);

  let { chatrooms } = useSelector((state) => state.traces);

  chatrooms.sort((a, b) => {
    return b.id - a.id; //this will sort according to .id descending
  });
  return (
    <div className="chatroom-page">
      <div className="chatroom-wrapper">
        <Banner subTitle={"Lounge"} />
        <div className="chatroom-content">
          <h2>Chatroom</h2>
          <div>
            <Link to="/newchat">
              <p>Start new discussion</p>
            </Link>
            {chatrooms.map((chatrooms) => (
              <Link key={uuid()} to={"/chatroom/" + chatrooms.id} title={chatrooms.attributes.title}>
                <p>{chatrooms.attributes.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
