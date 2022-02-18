import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Home from "./pages/Home";
import Lounge from "./pages/Lounge";
import Vision from "./pages/Vision";
import Visionary from "./pages/Visionary";
import Chatroom from "./pages/Chatrooms";
import Support from "./pages/Support";
import NewChat from "./pages/NewChat";
import Chat from "./pages/Chat";
import SingleTrace from "./pages/SingleTracePage";
import Contribution from "./pages/Contribution";
import Labyrinth from "./pages/Labyrinth";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// REDUX SETUP
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lounge" element={<Lounge />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/visionary" element={<Visionary />} />
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path="/support" element={<Support />} />
          <Route path="/newchat" element={<NewChat />} />
          <Route path="/chatroom/:id" element={<Chat />} />
          <Route path="/trace/:id" element={<SingleTrace />} />
          <Route path="/contribution/:id" element={<Contribution />} />
          <Route path="/labyrinth" element={<Labyrinth />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
