import "../styles/app.scss";
import React, { useEffect, useState } from "react";
import { loadTraces } from "../actions/tracesAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import LabWrapper from "../components/LabWrapper";
import uuid from "react-uuid";

// Components

const Labyrinth = () => {
  const [upExist, setUpExist] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTraces());
  }, [dispatch]);

  const { articles } = useSelector((state) => state.traces);
  console.log(articles);
  let i = articles.length,
    k,
    temp;
  while (--i > 0) {
    k = Math.floor(Math.random() * (i + 1));
    temp = articles[k];
    articles[k] = articles[i];
    articles[i] = temp;
  }

  let labyrinth = [[5, 5]];

  while (labyrinth.length < articles.length) {
    let labLength = labyrinth.length;

    // choisir aléatoirement un endroit du labyrinthe
    let articleRandomPos;
    if (labLength < 1) {
      articleRandomPos = 0;
    } else {
      articleRandomPos = Math.floor(Math.random() * labLength);
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

    // si 0 ---> on déplace X de -1 ou 1 et le Y ne change pas et l'inverse si c'est 1
    if (moveXorY === 0) {
      if (xOther === 0) {
        newX = xOther++;
      } else {
        newX = Math.floor(Math.random() * 3) - 1;
      }
      newCoordinates = [xOther + newX, yOther];
    } else {
      if (yOther === 0) {
        newY = yOther++;
      } else {
        newY = Math.floor(Math.random() * 3) - 1;
      }
      newCoordinates = [xOther, yOther + newY];
    }
    // fonction pour checker si ces coordonnées existent déjà
    function isArrayInArray(arr, item) {
      var item_as_string = JSON.stringify(item);

      var contains = arr.some(function (ele) {
        return JSON.stringify(ele) === item_as_string;
      });
      return contains;
    }

    // si ça existe déjà on fait rien, on recommence tout depuis le début, autrement on ajoute les nouvelles coordonnées au tableau
    console.log(isArrayInArray(labyrinth, newCoordinates));
    if (isArrayInArray(labyrinth, newCoordinates)) {
      console.log("ca existe deja");
    } else {
      console.log("nouveau!");
      labyrinth.push(newCoordinates);
    }
    //   }
  }

  console.log(labyrinth);
  for (let i = 0; i < articles.length; i++) {
    let thisArticle = articles[i];
    thisArticle["xy"] = labyrinth[i];
  }
  let largeur = parseInt(window.innerWidth) * 9.45;
  let hauteur = parseInt(window.innerHeight) * 4.5;
  console.log(largeur);
  console.log(hauteur);
  window.scrollTo(largeur, hauteur);

  let initialPos = [5, 5];
  let nextPos = initialPos;

  const scrollUp = () => {
    nextPos[1]--;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    console.log(includes);
    if (includes) {
      hauteur = hauteur - parseInt(window.innerHeight) * 0.9;
      window.scrollTo(largeur, hauteur);
    } else {
      nextPos[1]++;
    }
    console.log(nextPos);
  };
  const scrollDown = () => {
    nextPos[1]++;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    console.log(includes);
    if (includes) {
      hauteur = hauteur + parseInt(window.innerHeight) * 0.9;
      window.scrollTo(largeur, hauteur);
    } else {
      nextPos[1]--;
    }
    console.log(nextPos);
  };

  const scrollLeft = () => {
    nextPos[0]--;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      largeur = largeur - parseInt(window.innerWidth) * 0.9;
      window.scrollTo(largeur, hauteur);
    } else {
      nextPos[0]++;
    }
  };

  const scrollRight = () => {
    nextPos[0]++;
    let includes = labyrinth.some((a) => nextPos.every((v, i) => v === a[i]));
    if (includes) {
      largeur = largeur + parseInt(window.innerWidth) * 0.9;
      window.scrollTo(largeur, hauteur);
    } else {
      nextPos[0]--;
    }
  };

  const checkUp = () => {};

  document.body.style.overflow = "hidden";
  return (
    <div className="lab-all">
      <div className="lab-nav">
        <div onClick={scrollUp} className="lab-top"></div>
        <div onClick={scrollLeft} className="lab-left"></div>
        <div onClick={scrollRight} className="lab-right"></div>
        <div onClick={scrollDown} className="lab-bottom"></div>
      </div>
      <div className="lab-wrapper">
        {articles.map((articles, index) => (
          <LabWrapper article={articles} key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default Labyrinth;
