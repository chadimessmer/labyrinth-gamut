import "../styles/app.scss";
import React, { useEffect, useState, useRef } from "react";
import { loadTraces } from "../actions/tracesAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LabWrapper from "../components/LabWrapper";
import uuid from "react-uuid";
import smoothscroll from "smoothscroll-polyfill";
import { isMobile } from "react-device-detect";

// Components
smoothscroll.polyfill();

const Labyrinth = () => {
  const lab = useRef(null);
  useEffect(() => {
    // console.log(lab.current);
  });

  const [upExist, setUpExist] = useState(true);

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

  let labyrinth = [[5, 5, 0]];
  let count = 0;

  let onlyTwo = [[5, 5]];

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
      if (xOther === 0) {
        newX = xOther++;
      } else {
        newX = Math.floor(Math.random() * 3) - 1;
      }
      newCoordinates = [xOther + newX, yOther, 1];
      twoCoordinates = [xOther + newX, yOther];
    } else {
      if (yOther === 0) {
        newY = yOther++;
      } else {
        newY = Math.floor(Math.random() * 3) - 1;
      }
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
      if (articleRandom[2] > 1 || articleRandom[1] < 3 || articleRandom[0] < 3) {
        insertAndShift(labyrinth, articleRandomPos, 0);
        offset++;
      }
    }
    //   }
  }

  for (let i = 0; i < articles.length; i++) {
    let thisArticle = articles[i];
    thisArticle["xy"] = labyrinth[i];
    thisArticle["color"] = Math.random() * 360;
  }
  let hauteurScroll = parseInt(window.innerHeight);
  let largeur = -505;
  let hauteur = -505;

  // window.scroll(largeur, hauteur);
  let initialPos = [5, 5];
  let nextPos = initialPos;

  let upDown = 0;

  const scrollUp = () => {
    nextPos[1]--;
    upDown++;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      hauteur = hauteur + 100;
      lab.current.style.transform = "translate(" + largeur + "vw, " + hauteur + "vh)";
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
      hauteur = hauteur - 100;
      lab.current.style.transform = "translate(" + largeur + "vw, " + hauteur + "vh)";
    } else {
      upDown--;
      nextPos[1]--;
    }
  };

  const scrollLeft = () => {
    nextPos[0]--;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      largeur = largeur + 100;
      lab.current.style.transform = "translate(" + largeur + "vw, " + hauteur + "vh)";
    } else {
      nextPos[0]++;
    }
  };

  const scrollRight = () => {
    nextPos[0]++;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      largeur = largeur - 100;
      lab.current.style.transform = "translate(" + largeur + "vw, " + hauteur + "vh)";
    } else {
      nextPos[0]--;
    }
  };

  let resizeTimer;

  if (!isMobile) {
    window.addEventListener("resize", function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // Run code here, resizing has "stopped"
        window.location.reload(false);
      }, 250);
    });
  }

  let allArticles = articles;
  // console.log(articles);

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
          <LabWrapper article={articles} slide={slide} articles={allArticles} title={articles.id} key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default Labyrinth;
