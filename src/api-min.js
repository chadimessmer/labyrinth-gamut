const baseUrl="https://labyrinthbackend.herokuapp.com/api",articlesApi="/articles?populate=*",chatroomsApi="/chatrooms",tracesApi="/traces?populate=*",visionApi="/vision?populate=*",visonarysApi="/visionary?populate=*",supportApi="/support";export const tracesUrl=()=>`${baseUrl}${tracesApi}`;export const articlesUrl=()=>`${baseUrl}${articlesApi}`;export const chatroomsUrl=()=>`${baseUrl}/chatrooms`;export const visionUrl=()=>`${baseUrl}${visionApi}`;export const visionaryUrl=()=>`${baseUrl}${visonarysApi}`;export const supportUrl=()=>`${baseUrl}/support`;