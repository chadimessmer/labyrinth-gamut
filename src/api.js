const baseUrl = "https://labyrinthbackend.herokuapp.com/api";

const articlesApi = "/articles?populate=*";
const articleSlide = "/articles?populate=type.imageslider.imageslider?populate=*";
const chatroomsApi = "/chatrooms";
const tracesApi = "/traces?populate=*";
const visionApi = "/vision?populate=*";
const visonarysApi = "/visionary?populate=*";
const supportApi = "/support";
const commentApi = "/chatmessages?populate=*";

export const tracesUrl = () => `${baseUrl}${tracesApi}`;
export const articlesUrl = () => `${baseUrl}${articlesApi}`;
export const chatroomsUrl = () => `${baseUrl}${chatroomsApi}`;
export const visionUrl = () => `${baseUrl}${visionApi}`;
export const visionaryUrl = () => `${baseUrl}${visonarysApi}`;
export const supportUrl = () => `${baseUrl}${supportApi}`;
export const slideUrl = () => `${baseUrl}${articleSlide}`;
export const commmentUrl = () => `${baseUrl}${commentApi}`;
