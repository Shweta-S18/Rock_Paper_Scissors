import { useState } from "react";
import classes from "./Rps.module.css";

export default function RockPaperScizzors() {
  let [msg, setMsg] = useState("");
  let [userScore, setUserScore] = useState(0);
  let [compScore, setCompScore] = useState(0);
  const rps = ["rock", "paper", "scissors"];

  let userChoice;
  let compChoice;

  function computerTurn() {
    const randomIndex = Math.floor(Math.random() * rps.length);
    compChoice = rps[randomIndex];
  }

  function drawGame() {
    setMsg("Game was Draw, Play again.");
  }

  function restartTheGame() {
    setMsg("");
    setCompScore((prevCompScore) => (prevCompScore = 0));
    setUserScore((prevUserScore) => (prevUserScore = 0));
  }

  const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      setUserScore((prevUserScore) => prevUserScore + 1);
      setMsg(`You win! Your ${userChoice} beats ${compChoice}`);
    } else {
      setCompScore((prevCompScore) => prevCompScore + 1);
      setMsg(`You Lose! ${compChoice} beats Your ${userChoice}`);
    }
  };
  function playGame() {
    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userChoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
      } else if (userChoice === "paper") {
        userWin = compChoice === "scissors" ? false : true;
      } else {
        userWin = compChoice === "rock" ? false : true;
      }
      showWinner(userWin, userChoice, compChoice);
    }
  }

  const handleUserClick = (event) => {
    userChoice = event.target.getAttribute("data-value");
    computerTurn();
    playGame();
  };

  return (
    <div className="rps_container container d-flex flex-column align-items-center justify-content-center mt-5 bg-black text-white p-5 mx-auto rounded-4">
      <h1
        className=" shadow p-3 mb-3 bg-body-tertiary rounded
       p-2 d-inline-block bg-dark-subtle text-center "
      >
        <span className="text-black">Rock</span> Paper Scissors
         
      </h1>

      <h3 className="mt-4 color-bg-color-red text-center">{msg}</h3>

      <div className="userChoices d-flex flex-column flex-md-row  gap-3 mt-5 ">
        <div className={classes.userChoice}>
          <img
            src="/img/rock.png"
            alt="rock"
            className="rounded-circle"
            data-value="rock"
            onClick={handleUserClick}
          />
        </div>
        <div className={classes.userChoice}>
          <img
            src="/img/paper.png"
            alt="paper"
            className="rounded-circle"
            data-value="paper"
            onClick={handleUserClick}
          />
        </div>
        <div className={classes.userChoice}>
          <img
            src="/img/scissors.png"
            alt="scissors"
            className="rounded-circle img-fluid"
            data-value="scissors"
            onClick={handleUserClick}
          />
        </div>
      </div>

      <div
        className=" d-flex flex-column flex-md-row 
       align-items-center justify-content-center mt-3 border border-warning px-5 mt-5 rounded-3"
      >
        <div className="score-card mt-4 fw-bold fs-5  p-2">
          <p className="border border-warning px-3 py-2 rounded">
            UserScore : {userScore}
          </p>
          <p className="border  border-info px-3 py-2 rounded">
            CompScore: {compScore}
          </p>
        </div>

        <button
          className="btn btn-danger fs-5 fw-bold px-5 py-2 m-2"
          onClick={restartTheGame}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
