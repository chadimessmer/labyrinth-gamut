const initState = {
  trace: [],
  articles: [],
  chatrooms: [],
  vision: [],
  visionary: [],
  support: [],
  slide: [],
  comment: [],
};

const tracesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_TRACES":
      return {
        ...state,
        trace: action.payload.trace,
        articles: action.payload.articles,
        chatrooms: action.payload.chatrooms,
        vision: action.payload.vision,
        visionary: action.payload.visionary,
        support: action.payload.support,
        slide: action.payload.slide,
        comment: action.payload.comment,
      };
    default:
      return { ...state };
  }
};

export default tracesReducer;
