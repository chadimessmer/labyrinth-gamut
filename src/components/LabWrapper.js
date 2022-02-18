import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Player } from "video-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Link } from "react-router-dom";
import Embed from "react-embed";
import SlideShow from "./SlideShow";
import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";

const LabWrapper = ({ article }) => {
  let offsetLarge;
  let offsetHauteur;
  let pos = article.xy;
  let style;
  let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  let beginGrad = "radial-gradient(circle, ";
  let endGrad = "10%, rgba(255,255,255,0) 40%)";
  let finalColor = beginGrad + color + endGrad;

  const calculatePosition = () => {
    let largeur = parseInt(window.innerWidth);
    let hauteur = parseInt(window.innerHeight);

    let largeurZero = (largeur / 100) * 5;
    let largeurNegative = (largeur / 100) * 95;
    let largeurPositive = (largeur / 100) * 95;

    let hauteurZero = (hauteur / 100) * 5;
    let hauteurNegative = (hauteur / 100) * 95;
    let hauteurPositive = (hauteur / 100) * 95;

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
    console.log("je calcul");

    style = {
      position: "absolute",
      top: offsetHauteur,
      left: offsetLarge,

      background: color,
    };
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
  let contentList = article.attributes.type;
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
              } else if (contentList.__component === "image-slider.image-slider") {
              }
            })}
            {singleMedia && injectMedia()}
            <br />
            {authorWebsite()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabWrapper;
