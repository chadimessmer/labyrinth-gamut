import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import uuid from "react-uuid";

const SlideShow = ({ images }) => {
  const slideImages = [];

  let allImages = images.data;

  for (let image of allImages) {
    slideImages.push(image.attributes.url);
  }
  //   const carousel = () => {};
  const properties = {
    duration: 3000,
    autoplay: false,
    indicators: true,
    arrows: false,
  };
  return (
    <div >
      <Slide {...properties}>
        {allImages.map((el, index) => {
          return (
            <div key={uuid()} className="each-slide">
              <div style={{ backgroundImage: `url(${slideImages[index]})` }}></div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default SlideShow;
