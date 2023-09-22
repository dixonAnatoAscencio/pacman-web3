import {modelMap} from "../utils/gameMap"

let hs = localStorage.getItem('highscore') ? localStorage.getItem('highscore') : 0;

let map = modelMap.map((line, yIndex) => {
   return line.map((tile, xIndex) => {
        let visited = !(tile === 0 || tile === 2)
        let canVisit = tile === 0 || tile === 2 || tile === 5
        return {
            x: xIndex,
            y: yIndex,
            type: tile,
            canVisit: canVisit,
            visited: visited,
            isPacManHere: false,
            ghostHere: null
        }
    })
})

export const initialState = {
  gameState: 'GAME',
  gameMap : map,
  score: 0,
  highscore: hs,
  pacman: {
    currentLocation: {y: 0, x: 0},
    direction: 'none'
  },
  ghosts: {
    RED: {
      currentLocation: {y:1, x: 1},
      prevLocation: {y:1, x: 1},
      type: 'RED',
      direction: 'Down'
    },
    PINK: {
      currentLocation: {y: 0, x: 0},
      prevLocation: {y:0, x: 0},
      type: 'PINK',
      direction: 'Down'
    },
    BLUE: {
      currentLocation: {y: 0, x: 0},
      prevLocation: {y:0, x: 0},
      type: 'BLUE',
      direction: 'Down'
    },
    ORANGE: {
      currentLocation: {y: 0, x: 0},
      prevLocation: {y:0, x: 0},
      type: 'ORANGE',
      direction: 'Down'
    }
  }
}