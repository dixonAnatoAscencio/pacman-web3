import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import style from "./gamePage.module.css"
import GameLine from "./gameLine"
import { useDispatch, useSelector } from "react-redux";
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
import { useWeb3React } from "@web3-react/core";
import PacManGameAbi from "../../blockchain/abi/PacManGame.json";
const apiUrl = "https://packman-api.vercel.app/updateWinnerScore"

const GamePage = () => {
  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();
  const selectedNetwork = 80001;
  const [rankList, setRankList] = useState([]);

  let pancmanGameAddress = "0x0000fF0d724a25FBBcB1504642CF1713D3c13fac";
  let pancmanGameContract;

  if (account && library) {
    pancmanGameContract = new library.eth.Contract(PacManGameAbi, pancmanGameAddress);
  }

  const dispatch = useDispatch()
  const { gameMap, score, highscore, pacman, gameState } = useSelector((state) => state)

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
    const unloadCallback = (event) => {
      console.log("unloadCallback");
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  useEffect(() => {
    switch (gameState) {
      case "GAME":
        getHighScore().then((res) => {
          console.log({ res })
          //score = Number(res);
          //dispatch(setHighscore())
          localStorage.setItem('highscore', Number(res))
        })
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

  const getHighScore = async () => {
    return pancmanGameContract.methods
      .highScore()
      .call()
      .then((res) => {
        console.log("res", res);
        return res;
      });
  };

  useEffect(() => {
    if (gameMap.filter(line => {
      return line.filter(el => {
        return el.isPacManHere === true && el.ghostHere !== null
      }).length > 0
    }).length > 0) {
      console.log('PacMan is dead')
      getHighScore().then((res) => {
        console.log(res)
        console.log(highscore)
        if (Number(highscore) > Number(res)) {
          console.log('New highscore!')
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ winnerScore: highscore, winnerAddress: account }),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              toast.success('New highscore!')
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      })

      getRanking().then((res1) => {
        console.log("getRanking", res1);

        let rankList = [];
        for (let i = 0; i < res1.length; i++) {
          console.log("res1[i]", res1[i]);

          rankList.push({
            address: res1[i][0],
            score: res1[i][1],
          });

        }


        rankList.sort((a, b) => {
          return b.score - a.score;
        });
        console.log("rankList", rankList);
        setRankList(rankList);


      });
      dispatch(endGame())
    }
  }, [gameMap.filter(line => {
    return line.filter(el => {
      return el.isPacManHere === true && el.ghostHere !== null
    }).length > 0
  }).length > 0])

  function getRankEmoji(rank) {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  }

  const getRanking = async () => {
    return pancmanGameContract.methods
      .getRanking()
      .call()
      .then((res) => {
        return res;
      });
  };
  useEffect(() => {

    if (account && library) {
      getRanking().then((res1) => {
        console.log("getRanking", res1);

        let rankList = [];
        for (let i = 0; i < res1.length; i++) {
          console.log("res1[i]", res1[i]);

          rankList.push({
            address: res1[i][0],
            score: res1[i][1],
          });

        }


        rankList.sort((a, b) => {
          return b.score - a.score;
        });
        console.log("rankList", rankList);
        setRankList(rankList);


      });
    }
  }, [activate, chainId, account]);

  return (
    <div className={style.main}>
      <div className={style.mainContainer}>
        <div><Toaster /></div>
        <div className={style.gameContainer}>
          <div className={style.score}>
            game score <p className={style.scoreText}>{score}</p>
          </div>
          <div className={style.map}>
            {gameMap.map((line, index) => <GameLine tiles={line} key={index} />)}
          </div>
          <div className={style.score}>
            high score <p className={style.scoreText}>{highscore}</p>
          </div>
        </div>
        <div className={style.buttonContainer}>{
          gameState === "END" && <button className={style.button} onClick={refreshPage}> back to main screen </button>
        }</div>
      </div>

      <div className={style.rankContainer }>
        <h1 style={{ color: 'white' }}>Leaderboard</h1>

        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Wallet</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rankList.map((row, index) => {
              return (
                <tr key={index}>
                  {<td>{index + 1}  {getRankEmoji(index + 1)}</td>}
                  <td>{row.address}</td>
                  <td>{row.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GamePage;