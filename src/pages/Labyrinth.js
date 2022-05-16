import "../styles/app.scss";
import React, { useEffect, useState, useRef } from "react";
import { loadTraces } from "../actions/tracesAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LabWrapper from "../components/LabWrapper";
import uuid from "react-uuid";
// import smoothscroll from "smoothscroll-polyfill";
import { isMobileOnly } from "react-device-detect";

// Components

const Labyrinth = () => {
  const lab = useRef(null);
  useEffect(() => {
    console.log(lab.current);
  });

  const [upExist, setUpExist] = useState(true);
  const [position, setPosition] = useState([0, 0]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { articles, slide } = useSelector((state) => state.traces);
  let i = articles.length,
    k,
    temp;
  while (--i > 0) {
    k = Math.floor(Math.random() * (i + 1));
    temp = articles[k];
    articles[k] = articles[i];
    articles[i] = temp;
  }

  let labyrinth = [[0, 0, 0]];
  let count = 0;

  let onlyTwo = [[0, 0]];

  let offset = 0;
  function insertAndShift(arr, from, to) {
    let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
    arr.splice(to, 0, cutOut); // insert it at index 'to'
  }

  while (labyrinth.length < articles.length) {
    let labLength = labyrinth.length;
    count++;

    // choisir aléatoirement un endroit du labyrinthe
    let articleRandomPos;
    if (labLength < 1) {
      articleRandomPos = 0;
    } else {
      articleRandomPos = Math.floor(Math.random() * (labLength - offset) + offset);
    }
    let articleRandom = labyrinth[articleRandomPos];
    //   if (articleRandom[2] < 3) {
    //   articleRandom[2]++;
    // les coordonnées de cet endroit
    let xOther = articleRandom[0];
    let yOther = articleRandom[1];

    // choisir si on va se déplacer sur les X ou Y
    let moveXorY = Math.round(Math.random());
    let newX;
    let newY;
    let newCoordinates;
    let twoCoordinates;

    // si 0 ---> on déplace X de -1 ou 1 et le Y ne change pas et l'inverse si c'est 1
    if (moveXorY === 0) {
      // if (xOther === 0) {
      //   newX = xOther++;
      // } else {
      let plusMinus = Math.round(Math.random());
      if (plusMinus === 0) {
        newX = -1;
      } else {
        newX = 1;
      }
      // newX = Math.floor(Math.random() * 3) - 1;
      console.log(newX);
      // }
      newCoordinates = [xOther + newX, yOther, 1];
      twoCoordinates = [xOther + newX, yOther];
    } else {
      // if (yOther === 0) {
      //   newY = yOther++;
      // } else {
      let plusMinus = Math.round(Math.random());
      if (plusMinus === 0) {
        newY = -1;
      } else {
        newY = 1;
      }

      // newY = Math.floor(Math.random() * 3) - 1;
      // }
      newCoordinates = [xOther, yOther + newY, 1];
      twoCoordinates = [xOther, yOther + newY];
    }
    // fonction pour checker si ces coordonnées existent déjà
    function isArrayInArray(arr, item) {
      var item_as_string = JSON.stringify(item);
      // console.log(item_as_string);

      var contains = arr.some(function (ele) {
        return JSON.stringify(ele) === item_as_string;
      });
      return contains;
    }

    // si ça existe déjà on fait rien, on recommence tout depuis le début, autrement on ajoute les nouvelles coordonnées au tableau
    if (isArrayInArray(onlyTwo, twoCoordinates)) {
      // console.log("ca existe deja");
    } else {
      // console.log("nouveau!");
      labyrinth.push(newCoordinates);
      onlyTwo.push(twoCoordinates);
      articleRandom[2]++;
      if (articleRandom[2] > 2) {
        insertAndShift(labyrinth, articleRandomPos, 0);
        offset++;
      }
    }
    //   }
  }
  console.log(count);

  for (let i = 0; i < articles.length; i++) {
    let thisArticle = articles[i];
    thisArticle["xy"] = labyrinth[i];
    thisArticle["color"] = Math.random() * 360;
  }
  let hauteurScroll = parseInt(window.innerHeight);
  let largeur = window.innerWidth * -0.05;
  let hauteur = window.innerHeight * -0.05;

  // window.scroll(largeur, hauteur);
  let initialPos = [0, 0];
  let nextPos = initialPos;

  let upDown = 0;

  const scrollUp = () => {
    nextPos[1]--;
    upDown++;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      hauteur = hauteur + window.innerHeight;
      lab.current.style.transform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.webkitTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.msTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.MozTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.OTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      // setPosition([nextPos]);
      // console.log(nextPos);
      // console.log(position);
    } else {
      upDown--;
      nextPos[1]++;
    }
  };
  const scrollDown = () => {
    nextPos[1]++;
    upDown++;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      hauteur = hauteur - window.innerHeight;
      lab.current.style.transform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.webkitTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.msTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.MozTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.OTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      setPosition[0] = position;
    } else {
      upDown--;
      nextPos[1]--;
    }
  };

  const scrollLeft = () => {
    nextPos[0]--;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      largeur = largeur + window.innerWidth;
      lab.current.style.transform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.webkitTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.msTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.MozTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.OTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      setPosition[0] = position;
    } else {
      nextPos[0]++;
    }
  };

  const scrollRight = () => {
    nextPos[0]++;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      largeur = largeur - window.innerWidth;
      lab.current.style.transform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.webkitTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.msTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.MozTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      lab.current.style.OTransform = "translate(" + largeur + "px, " + hauteur + "px)";
      setPosition[0] = position;
    } else {
      nextPos[0]--;
    }
  };

  let resizeTimer;
  // if (isMobile) {
  // }

  if (!isMobileOnly) {
    if (lab.current) {
      lab.current.style.transition = "all 1.5s ease-in-out";
    }
    window.addEventListener("resize", function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // Run code here, resizing has "stopped"
        window.location.reload(false);
      }, 250);
    });
  }
  if (lab.current) {
    let widthMove = window.innerWidth * -0.05;
    let heightMove = window.innerHeight * -0.05;
    lab.current.style.transform = "translate(" + widthMove + "px, " + heightMove + "px)";
    lab.current.style.webkitTransform = "translate(" + widthMove + "px, " + heightMove + "px)";
    lab.current.style.msTransform = "translate(" + widthMove + "px, " + heightMove + "px)";
    lab.current.style.MozTransform = "translate(" + widthMove + "px, " + heightMove + "px)";
    lab.current.style.OTransform = "translate(" + widthMove + "px, " + heightMove + "px)";
  }

  let allArticles = articles;
  console.log(labyrinth);

  // document.body.style.overflow = "hidden";

  return (
    <div className="lab-all">
      <div className="banner-container-lab">
        <div>
          <Link to={"/"}>LABYRINTH</Link>
        </div>
      </div>
      <div className="lab-nav">
        <div onClick={scrollUp} className="lab-top"></div>
        <div onClick={scrollLeft} className="lab-left"></div>
        <div onClick={scrollRight} className="lab-right"></div>
        <div onClick={scrollDown} className="lab-bottom"></div>
      </div>
      <div ref={lab} className="lab-wrapper">
        {articles.map((articles, index) => (
          <LabWrapper article={articles} position={position} slide={slide} articles={allArticles} title={articles.id} key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default Labyrinth;
