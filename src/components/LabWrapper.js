import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Player } from "video-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Link } from "react-router-dom";
import Embed from "react-embed";
import SlideShow from "./SlideShow";
import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";

const LabWrapper = ({ articles, article, slide, title }) => {
  let offsetLarge;
  let offsetHauteur;
  let pos = article.xy;
  let style;
  let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  let beginGrad = "radial-gradient(circle, ";
  let endGrad = "10%, rgba(255,255,255,0) 40%)";
  let finalColor = beginGrad + color + endGrad;

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
    console.log(intermediateColor);

    colorLeft = "hsl(" + intermediateColor + ", 100%, 50%)";
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
    colorRight = "hsl(" + intermediateColor + ", 100%, 50%)";
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
    colorTop = "hsl(" + intermediateColor + ", 100%, 50%)";
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
    colorBottom = "hsl(" + intermediateColor + ", 100%, 50%)";
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
    } else if (pos[0] === -1) {
      offsetLarge = pos[0] * (largeurPositive + largeurZero * 2 * pos[0]) + "px";
    } else if (pos[0] > 0) {
      offsetLarge = pos[0] * largeurPositive - largeurZero * (pos[0] - 1) + "px";
    } else {
      offsetLarge = pos[0] * (largeurPositive - (largeurZero / 2) * 2) + "px";
    }

    if (pos[1] === 0) {
      offsetHauteur = hauteurZero + "px";
    } else if (pos[1] > 0) {
      offsetHauteur = pos[1] * hauteurPositive - hauteurZero * (pos[1] - 1) + "px";
    } else {
      offsetHauteur = pos[1] * (hauteurPositive + hauteurZero) + "px";
    }

    style = {
      position: "absolute",
      top: offsetHauteur,
      left: offsetLarge,
    };
  };

  let thisColor = "hsl(" + article.color + ", 100%, 50%)";

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
        return <ReactAudioPlayer controls src={singleMedia.data.attributes.url} />;
      } else if (singleMedia.data.attributes.mime.includes("image")) {
        return <img src={singleMedia.data.attributes.url} alt={singleMedia.data.attributes.name}></img>;
      } else if (singleMedia.data.attributes.mime.includes("video")) {
        return (
          <Player>
            <source src={singleMedia.data.attributes.url} />
          </Player>
        );
      } else if (singleMedia.data.attributes.mime.includes("pdf")) {
        return (
          <div>
            <Document file={singleMedia.data.attributes.url} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              <span onClick={prev}> prev </span> {pageNumber} of {numPages} <span onClick={next}> next </span>
            </p>
          </div>
        );
      }
    }
  };
  const authorWebsite = () => {
    if (authorWeb) {
      return (
        <a rel="noreferrer" target="_blank" href={authorWeb}>
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
      console.log(pageNumber);
    }
  };

  const prev = () => {
    if (pageNumber > 1) {
      decrementCounter();
    }
  };

  return (
    <div style={style} className="lab-single">
      <div className="lab-relative">
        <div className="background-lab">
          <div class="container">
            <div class="container-top">
              <div style={styleTop} class="top"></div>
            </div>
            <div class="container-center">
              <div style={styleLeft} class="left"></div>
              <div style={styleCenter} class="center-div"></div>
              <div style={styleRight} class="right"></div>
            </div>
            <div class="container-bottom">
              <div style={styleBottom} class="bottom"></div>
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
                  return <ReactMarkdown key={uuid()}>{contentList.text}</ReactMarkdown>;
                } else if (contentList.external_content) {
                  return <Embed url={contentList.external_content} />;
                } else if (contentList.__component == "image-slider.image-slider") {
                  return <SlideShow images={contentList.imageslider} />;
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
