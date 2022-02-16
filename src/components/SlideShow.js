import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [];

const SlideShow = ({ images }) => {
  console.log(images);
  let allImages = images.data;

  for (let image of allImages) {
    console.log(image);
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
    <div>
      <Slide {...properties}>
        {allImages.map((el, index) => {
          return (
            <div className="each-slide">
              <div style={{ backgroundImage: `url(${slideImages[index]})` }}></div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default SlideShow;
