import axios from "axios";
import { tracesUrl, articlesUrl, chatroomsUrl, visionUrl, visionaryUrl, supportUrl, slideUrl } from "../api";

export const loadTraces = () => async (dispatch) => {
  const tracesData = await axios.get(tracesUrl());
  const articlesData = await axios.get(articlesUrl());
  const chatroomsData = await axios.get(chatroomsUrl());
  const visionData = await axios.get(visionUrl());
  const visionaryData = await axios.get(visionaryUrl());
  const supportData = await axios.get(supportUrl());
  const slideData = await axios.get(slideUrl());

  dispatch({
    type: "FETCH_TRACES",
    payload: {
      trace: tracesData.data.data,
      articles: articlesData.data.data,
      chatrooms: chatroomsData.data.data,
      vision: visionData.data.data,
      visionary: visionaryData.data.data,
      support: supportData.data.data,
      slide: slideData.data.data,
    },
  });
};
