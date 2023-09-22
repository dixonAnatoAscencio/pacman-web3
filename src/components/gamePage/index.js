import React, {useEffect, useRef, useState} from 'react';
import style from "./gamePage.module.css"
import GameLine from "./gameLine"
import {useDispatch, useSelector} from "react-redux";
import {
  changeDirection,
  continueGame,
  deployGhosts,
  deployPacman,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  setHighscore,
  ghostsMoving,
  endGame, gameStart
} from "../../redux/actions/actions";


const GamePage = () => {
  const dispatch = useDispatch()
  const {gameMap, score, highscore, pacman, gameState} = useSelector((state) => state)

  const intervalRef = useRef(null)
  const ghostsIntervalRef = useRef(null)

  function refreshPage() {
    window.location.href = "/"
  }

  useEffect(() => {
    switch (pacman.direction) {
      case "Up":
        intervalRef.current = setInterval(() => dispatch(moveUp()), 150)
        break
      case "Down":
        intervalRef.current = setInterval(() => dispatch(moveDown()), 150)
        break
      case "Left":
        intervalRef.current = setInterval(() => dispatch(moveLeft()), 150)
        break
      case "Right":
        intervalRef.current = setInterval(() => dispatch(moveRight()), 150)
        break
    }
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [pacman.direction])


  useEffect(() => {
    switch (gameState) {
      case "GAME":
        ghostsIntervalRef.current = setInterval(() => dispatch(ghostsMoving()), 200)
        break
      case "END":
        clearInterval(ghostsIntervalRef.current)
        break
    }
  }, [gameState])

  useEffect(() => {
    dispatch(deployGhosts())
    dispatch(deployPacman())
    const body = document.querySelector("body")

    function directionSetup(newDirection) {
      if (pacman.direction !== newDirection) {
        dispatch(changeDirection(newDirection))
      }
    }

    body.addEventListener('keydown', event => {
      switch (event.key) {
        case "ArrowUp":
          directionSetup("Up")
          break
        case "ArrowDown":
          directionSetup("Down")
          break
        case "ArrowLeft":
          directionSetup("Left")
          break
        case "ArrowRight":
          directionSetup("Right")
          break
      }
    })
  }, [])

//setup highscore
  useEffect(() => {
    if (score > highscore) {
      dispatch(setHighscore())
      localStorage.setItem('highscore', score)
    }
  }, [score])


  //continue game with map rerender
  useEffect(() => {
    if (gameMap.filter(line => {
      return line.filter(el => {
        return el.visited === false
      }).length > 0
    }).length === 0) {
      dispatch(changeDirection('none'))
      console.log('Win!')
      // dispatch(continueGame())
    }
  }, [score])

  useEffect(() => {
    if (gameMap.filter(line => {
      return line.filter(el => {
        return el.isPacManHere === true && el.ghostHere !== null
      }).length > 0
    }).length > 0) {
      console.log('PacMan is dead')
      dispatch(endGame())
    }
  }, [gameMap.filter(line => {
    return line.filter(el => {
      return el.isPacManHere === true && el.ghostHere !== null
    }).length > 0
  }).length > 0])

  return (
    <div className={style.mainContainer}>
      <div className={style.gameContainer}>
        <div className={style.score}>
          game score <p className={style.scoreText}>{score}</p>
        </div>
        <div className={style.map}>
          {gameMap.map((line, index) => <GameLine tiles={line} key={index}/>)}
        </div>
        <div className={style.score}>
          high score <p className={style.scoreText}>{highscore}</p>
        </div>
      </div>
      <div className={style.buttonContainer}>{
        gameState === "END" && <button className={style.button} onClick={refreshPage}> back to main screen </button>
      }</div>

    </div>
  );
};

export default GamePage;