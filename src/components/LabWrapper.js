import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Player } from "video-react";
import { Document, Page } from "react-pdf";
import Embed from "react-embed";
import SlideShow from "./SlideShow";
import uuid from "react-uuid";
import chroma from "chroma-js";

const LabWrapper = ({ articles, article, slide, title }) => {
  // console.log(chroma("pink").darken().saturate(2).hex());
  let offsetLarge;
  let offsetHauteur;
  let pos = article.xy;
  let style;
  let color = "hsl(" + Math.random() * 360 + ", 100%, 70%)";
  let beginGrad = "radial-gradient(circle, ";
  let endGrad = "10%, rgba(255,255,255,0) 40%)";
  // let finalColor = beginGrad + color + endGrad;

  let thisPopulatedArticle = slide.filter((obj) => {
    return obj.id === title;
  });

  // couleur gauche
  let articleLeftOne = articles.filter((obj) => {
    return obj.xy[0] === article.xy[0] - 1;
  });
  let articleLeft = articleLeftOne.filter((obj) => {
    return obj.xy[1] === article.xy[1];
  });

  let colorLeft;

  let displayLeft;
  if (articleLeft[0]) {
    let colorFull = articleLeft[0].color;
    let intermediateColor = Math.abs(colorFull + article.color - 360);
    // console.log(chroma.scale({ h: colorFull, s: 100, l: 70 }, { h: article.color, s: 100, l: 70 }));

    colorLeft = "hsl(" + intermediateColor + ", 100%, 70%)";
    displayLeft = "visible";
  } else {
    colorLeft = "hsl(0, 100%, 100%)";
    displayLeft = "hidden";
  }

  // couleur droite

  let articleRightOne = articles.filter((obj) => {
    return obj.xy[0] === article.xy[0] + 1;
  });
  let articleRight = articleRightOne.filter((obj) => {
    return obj.xy[1] === article.xy[1];
  });

  let colorRight;
  let displayRight;

  if (articleRight[0]) {
    let colorFull = articleRight[0].color;
    let intermediateColor = Math.abs(colorFull + article.color - 360);

    displayRight = "visible";
    colorRight = "hsl(" + intermediateColor + ", 100%, 70%)";
  } else {
    colorRight = "hsl(0, 100%, 100%)";
    displayRight = "hidden";
  }

  // couleur haut

  let articleTopOne = articles.filter((obj) => {
    return obj.xy[0] === article.xy[0];
  });
  let articleTop = articleTopOne.filter((obj) => {
    return obj.xy[1] === article.xy[1] - 1;
  });

  let colorTop;
  let displayTop;

  if (articleTop[0]) {
    let colorFull = articleTop[0].color;
    let intermediateColor = (colorFull + article.color) / 2;

    displayTop = "visible";
    colorTop = "hsl(" + intermediateColor + ", 100%, 70%)";
  } else {
    colorTop = "hsl(0, 100%, 100%)";
    displayTop = "hidden";
  }

  // couleur bas
  let articleBottompOne = articles.filter((obj) => {
    return obj.xy[0] === article.xy[0];
  });
  let articleBottom = articleBottompOne.filter((obj) => {
    return obj.xy[1] === article.xy[1] + 1;
  });

  let colorBottom;

  let displayBottom;
  if (articleBottom[0]) {
    let colorFull = articleBottom[0].color;
    let intermediateColor = (colorFull + article.color) / 2;
    displayBottom = "visible";
    colorBottom = "hsl(" + intermediateColor + ", 100%, 70%)";
  } else {
    colorBottom = "hsl(0, 100%, 100%)";
    displayBottom = "hidden";
  }

  const calculatePosition = () => {
    let largeur = parseInt(window.innerWidth);
    let hauteur = parseInt(window.innerHeight);

    let largeurZero = (largeur / 100) * 5;
    let largeurNegative = (largeur / 100) * 95;
    let largeurPositive = (largeur / 100) * 105;

    let hauteurZero = (hauteur / 100) * 5;
    let hauteurNegative = (hauteur / 100) * 100;
    let hauteurPositive = (hauteur / 100) * 105;

    if (pos[0] === 0) {
      offsetLarge = largeurZero + "px";
    } else if (pos[0] > 0) {
      offsetLarge = pos[0] * largeurPositive - largeurZero * (pos[0] - 1) + "px";
    } else {
      offsetLarge = pos[0] * largeurPositive - largeurZero * (pos[0] - 1) + "px";
    }

    if (pos[1] === 0) {
      offsetHauteur = hauteurZero + "px";
    } else if (pos[1] > 0) {
      offsetHauteur = pos[1] * hauteurPositive - hauteurZero * (pos[1] - 1) + "px";
    } else {
      offsetHauteur = pos[1] * hauteurPositive - hauteurZero * (pos[1] - 1) + "px";
    }

    // console.log((pos[1] * hauteurPositive - hauteurZero * (pos[1] - 1)) / hauteur);
    // console.log((pos[0] * largeurPositive - largeurZero * (pos[0] - 1)) / largeur);

    style = {
      position: "absolute",
      top: offsetHauteur,
      left: offsetLarge,
    };
  };

  let thisColor = "hsl(" + article.color + ", 100%, 70%)";

  let styleCenter = {
    backgroundColor: thisColor,
  };

  let styleLeft = {
    backgroundImage: "linear-gradient(to left," + thisColor + ", " + colorLeft + ")",
    visibility: displayLeft,
  };

  let styleTop = {
    backgroundImage: "linear-gradient(" + colorTop + ", " + thisColor + ")",
    visibility: displayTop,
  };

  let styleBottom = {
    backgroundImage: "linear-gradient(" + thisColor + " ," + colorBottom + ")",
    visibility: displayBottom,
  };

  let styleRight = {
    backgroundImage: "linear-gradient(to right," + thisColor + ", " + colorRight + ")",
    visibility: displayRight,
  };

  if (pos) {
    calculatePosition();
  }

  window.onresize = calculatePosition;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [height, setHeight] = useState("0");
  let incrementCounter = () => setPageNumber(pageNumber + 1);
  let decrementCounter = () => setPageNumber(pageNumber - 1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  let thisTitle = article.attributes.title;
  let thisSubTitle = article.attributes.subtitle;
  let thisAuthor = article.attributes.author;
  let contentList = thisPopulatedArticle[0].attributes.type;
  let singleMedia = article.attributes.single_media;
  let authorWeb = article.attributes.website;

  const injectMedia = () => {
    if (singleMedia.data) {
      if (singleMedia.data.attributes.mime.includes("audio")) {
        return <ReactAudioPlayer key={uuid()} controls src={singleMedia.data.attributes.url} />;
      } else if (singleMedia.data.attributes.mime.includes("image")) {
        return <img key={uuid()} src={singleMedia.data.attributes.url} alt={singleMedia.data.attributes.name}></img>;
      } else if (singleMedia.data.attributes.mime.includes("video")) {
        return (
          <Player key={uuid()}>
            <source src={singleMedia.data.attributes.url} />
          </Player>
        );
      } else if (singleMedia.data.attributes.mime.includes("pdf")) {
        return (
          <div key={uuid()} className="pdf">
            <Document file={singleMedia.data.attributes.url} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              <span className="pdf-toggle" onClick={prev}>
                {" "}
                ←{" "}
              </span>{" "}
              {pageNumber} of {numPages}{" "}
              <span className="pdf-toggle" onClick={next}>
                {" "}
                →{" "}
              </span>
            </p>
          </div>
        );
      }
    }
  };
  const authorWebsite = () => {
    if (authorWeb) {
      return (
        <a key={uuid()} rel="noreferrer" target="_blank" href={authorWeb}>
          {thisAuthor}
        </a>
      );
    } else {
      return <p>{thisAuthor}</p>;
    }
  };

  const next = () => {
    if (pageNumber < numPages) {
      incrementCounter();
      // console.log(pageNumber);
    }
  };

  const prev = () => {
    if (pageNumber > 1) {
      decrementCounter();
    }
  };

  // console.log(contentList);

  return (
    <div style={style} className="lab-single">
      <div className="lab-relative">
        <div className="background-lab">
          <div className="container">
            <div className="container-top">
              <div style={styleTop} className="top"></div>
            </div>
            <div className="container-center">
              <div style={styleLeft} className="left"></div>
              <div style={styleCenter} className="center-div"></div>
              <div style={styleRight} className="right"></div>
            </div>
            <div className="container-bottom">
              <div style={styleBottom} className="bottom"></div>
            </div>
          </div>
        </div>
        <div className="wrapp-lab-content">
          <div className="single-article">
            <div className="article-title">
              <h2>{thisTitle}</h2>
              <h3>{thisSubTitle}</h3>
            </div>
            <div className="article-content">
              {contentList.map((contentList, index) => {
                if (contentList.text) {
                  return <div dangerouslySetInnerHTML={{ __html: contentList.text }} key={uuid()} />;
                } else if (contentList.external_content) {
                  return <Embed key={uuid()} url={contentList.external_content} />;
                } else if (contentList.__component === "image-slider.image-slider") {
                  return <SlideShow key={uuid()} images={contentList.imageslider} />;
                }
              })}
              {singleMedia && injectMedia()}
              <br />
              {authorWebsite()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabWrapper;
