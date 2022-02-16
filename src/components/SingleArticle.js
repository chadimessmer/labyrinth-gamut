import "../styles/app.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTraces } from "../actions/tracesAction";
import ReactMarkdown from "react-markdown";
import uuid from "react-uuid";
import { motion, AnimateSharedLayout } from "framer-motion";
import Toggle from "./Toggle";
import ReactAudioPlayer from "react-audio-player";
import { Player } from "video-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Link } from "react-router-dom";
import Embed from "react-embed";
import SlideShow from "./SlideShow";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const SingleArticle = ({ title, slide }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  let incrementCounter = () => setPageNumber(pageNumber + 1);
  let decrementCounter = () => setPageNumber(pageNumber - 1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const { articles } = useSelector((state) => state.traces);
  var thisSingleArticle = articles.filter((obj) => {
    return obj.id === title.id;
  });
  var thisPopulatedArticle = slide.filter((obj) => {
    return obj.id === title.id;
  });

  let articleId = thisSingleArticle[0].id;
  let thisTitle = thisSingleArticle[0].attributes.title;
  let thisSubTitle = thisSingleArticle[0].attributes.subtitle;
  let thisAuthor = thisSingleArticle[0].attributes.author;
  let contentList = thisPopulatedArticle[0].attributes.type;
  let singleMedia = thisSingleArticle[0].attributes.single_media;
  let authorWeb = thisSingleArticle[0].attributes.website;

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
    <div>
      <div className="single-article">
        <AnimateSharedLayout>
          <Toggle thisSubTitle={thisSubTitle} thisTitle={thisTitle}>
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
              {authorWebsite()}
            </div>
            <div className="block"></div>
          </Toggle>
        </AnimateSharedLayout>
      </div>
    </div>
  );
};

export default SingleArticle;
