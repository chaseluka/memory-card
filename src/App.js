import React, { useEffect, useMemo, useState } from "react";
import Card from "./components/Card";
import uniqid from "uniqid";
import "./style/App.css";

const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cardsClicked, setCardsClicked] = useState([]);

  const players = useMemo(
    () => [
      "curry",
      "durant",
      "embiid",
      "giannis",
      "jokic",
      "kawhi",
      "lebron",
      "lillard",
      "luka",
      "tatum",
    ],
    []
  );
  const [cards] = useState([
    <Card name={players[0]} key={uniqid()} />,
    <Card name={players[1]} key={uniqid()} />,
    <Card name={players[2]} key={uniqid()} />,
    <Card name={players[3]} key={uniqid()} />,
    <Card name={players[4]} key={uniqid()} />,
    <Card name={players[5]} key={uniqid()} />,
    <Card name={players[6]} key={uniqid()} />,
    <Card name={players[7]} key={uniqid()} />,
    <Card name={players[8]} key={uniqid()} />,
    <Card name={players[9]} key={uniqid()} />,
  ]);

  useEffect(() => {
    if (currentScore !== [currentScore]) {
      const displayScore = () => {
        const current = document.getElementById("current");
        const best = document.getElementById("best");

        current.textContent = currentScore;
        best.textContent = bestScore;
      };
      displayScore();
      const randomize = (array) => {
        let currentIndex = array.length,
          randomIndex;

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }
        return array;
      };
      randomize(cards);
    }
  }, [bestScore, cards, currentScore]);

  useEffect(() => {
    const score = (add) => {
      if (add) {
        setCurrentScore(currentScore + 1);
        if (bestScore <= currentScore) {
          setBestScore(bestScore + 1);
        }
      } else {
        setCurrentScore(0);
      }
    };
    const game = (e) => {
      if (cardsClicked.includes(e.target.id)) {
        console.log("hi");
        setCardsClicked([]);
        score(false);
      } else {
        setCardsClicked(cardsClicked.concat(e.target.id));
        score(true);
      }
      console.log(cardsClicked);
    };

    if (cardsClicked.length === 10) console.log("You won!");

    players.forEach((player) => {
      document.getElementById(`${player}`).addEventListener("click", game);
    });

    return () => {
      players.forEach((player) => {
        document.getElementById(`${player}`).removeEventListener("click", game);
      });
    };
  }, [bestScore, cardsClicked, currentScore, players]);

  return (
    <div className="container">
      <div className="title-container">
        <div className="title">Memory Game - NBA Edition</div>
      </div>
      <div className="text-container">
        <div className="info">
          WIN BY SELECTING ALL 10 PLAYERS WITHOUT SELECTING A PLAYER TWICE
        </div>
        <div className="score-container">
          <div className="score-type">
            <div className="score-title">Current Score: </div>
            <div className="score" id="current">
              0
            </div>
          </div>
          <div className="score-type">
            <div className="score-title">Best Score: </div>
            <div className="score" id="best">
              0
            </div>
          </div>
        </div>
      </div>
      <div id="cards">{cards}</div>
    </div>
  );
};

export default App;
