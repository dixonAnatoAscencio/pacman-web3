import {initialState} from "./initialState"
import {
  CONTINUE_GAME,
  DEPLOY_PACMAN,
  DEPLOY_GHOSTS,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  SET_HIGHSCORE,
  START_GAME,
  CHANGE_DIRECTION, END_GAME, GHOSTS_MOVING
} from "./actions/types"


// function handlePackman(pacman, map) {
//   switch (pacman.direction) {
//     case MOVE_UP:
//       let yLocationUp = pacman.currentLocation.y - 1
//       if (map[yLocationUp][pacman.currentLocation.x].canVisit === true) {
//         map[newState.currentLocation.y][pacman.currentLocation.x].isPacManHere = false
//         newState.currentLocation = {x: newState.currentLocation.x, y: yLocationUp}
//         newState.gameMap[yLocationUp][newState.currentLocation.x].isPacManHere = true
//         if (newState.gameMap[yLocationUp][newState.currentLocation.x].visited === false) {
//           newState.gameMap[yLocationUp][newState.currentLocation.x].visited = true
//           newState.score = newState.score += 100
//         }
//       }
//   }
//
// }

function arrayRandElement(array) {
  let random = Math.floor(Math.random() * array.length);
  return array[random];
}

export const reducer = (
  state = initialState,
  action
) => {
  const newState = {...state}
  switch (action.type) {
    case START_GAME:
      return newState
    case DEPLOY_PACMAN:
      newState.gameMap[17][13].isPacManHere = true
      newState.pacman.currentLocation = {y: 17, x: 13}
      return newState
    case DEPLOY_GHOSTS:
      newState.gameMap[13][11].ghostHere = 'RED'
      newState.gameMap[15][11].ghostHere = 'PINK'
      newState.gameMap[13][16].ghostHere = 'BLUE'
      newState.gameMap[15][16].ghostHere = 'ORANGE'
      newState.ghosts.RED.currentLocation = {y: 13, x: 11}
      newState.ghosts.PINK.currentLocation = {y: 15, x: 11}
      newState.ghosts.BLUE.currentLocation = {y: 13, x: 16}
      newState.ghosts.ORANGE.currentLocation = {y: 15, x: 16}
      return newState
    case CHANGE_DIRECTION:
      let direction
      if (newState.gameState !== "END") {
         direction = action.payload
        newState.pacman.direction = direction
      }
      return newState
    case SET_HIGHSCORE:
      newState.highscore = newState.score
      return newState
    case MOVE_UP:
      let yLocationUp = newState.pacman.currentLocation.y - 1
      if (newState.gameMap[yLocationUp][newState.pacman.currentLocation.x].canVisit === true) {
        newState.gameMap[newState.pacman.currentLocation.y][newState.pacman.currentLocation.x].isPacManHere = false
        newState.pacman.currentLocation = {x: newState.pacman.currentLocation.x, y: yLocationUp}
        newState.gameMap[yLocationUp][newState.pacman.currentLocation.x].isPacManHere = true
        if (newState.gameMap[yLocationUp][newState.pacman.currentLocation.x].visited === false) {
          newState.gameMap[yLocationUp][newState.pacman.currentLocation.x].visited = true
          newState.score = newState.score += 100
        }
      } else {
        newState.pacman.direction = 'none'
      }
      return newState
    case MOVE_DOWN:
      let yLocationDown = newState.pacman.currentLocation.y + 1
      if (newState.gameMap[yLocationDown][newState.pacman.currentLocation.x].canVisit === true) {
        newState.gameMap[newState.pacman.currentLocation.y][newState.pacman.currentLocation.x].isPacManHere = false
        newState.pacman.currentLocation = {x: newState.pacman.currentLocation.x, y: yLocationDown}
        newState.gameMap[yLocationDown][newState.pacman.currentLocation.x].isPacManHere = true
        if (newState.gameMap[yLocationDown][newState.pacman.currentLocation.x].visited === false) {
          newState.gameMap[yLocationDown][newState.pacman.currentLocation.x].visited = true
          newState.score = newState.score += 100
        }
      } else {
        newState.pacman.direction = 'none'
      }
      return newState
    case MOVE_LEFT:
      let xLocationLeft = newState.pacman.currentLocation.x - 1 >= 0 ? newState.pacman.currentLocation.x - 1 : 27
      if (newState.gameMap[newState.pacman.currentLocation.y][xLocationLeft].canVisit === true) {
        newState.gameMap[newState.pacman.currentLocation.y][newState.pacman.currentLocation.x].isPacManHere = false
        newState.pacman.currentLocation = {x: xLocationLeft, y: newState.pacman.currentLocation.y}
        newState.gameMap[newState.pacman.currentLocation.y][xLocationLeft].isPacManHere = true
        if (newState.gameMap[newState.pacman.currentLocation.y][xLocationLeft].visited === false) {
          newState.gameMap[newState.pacman.currentLocation.y][xLocationLeft].visited = true
          newState.score = newState.score += 100
        }
      } else {
        newState.pacman.direction = 'none'
      }
      return newState
    case MOVE_RIGHT:
      let xLocationRight = newState.pacman.currentLocation.x + 1 <= 27 ? newState.pacman.currentLocation.x + 1 : 0
      if (newState.gameMap[newState.pacman.currentLocation.y][xLocationRight].canVisit === true) {
        newState.gameMap[newState.pacman.currentLocation.y][newState.pacman.currentLocation.x].isPacManHere = false
        newState.pacman.currentLocation = {x: xLocationRight, y: newState.pacman.currentLocation.y}
        newState.gameMap[newState.pacman.currentLocation.y][xLocationRight].isPacManHere = true
        if (newState.gameMap[newState.pacman.currentLocation.y][xLocationRight].visited === false) {
          newState.gameMap[newState.pacman.currentLocation.y][xLocationRight].visited = true
          newState.score = newState.score += 100
        }
      } else {
        newState.pacman.direction = 'none'
      }
      return newState
    case GHOSTS_MOVING:
      const rLocation = newState.ghosts.RED.currentLocation
      const pLocation = newState.ghosts.PINK.currentLocation
      const bLocation = newState.ghosts.BLUE.currentLocation
      const oLocation = newState.ghosts.ORANGE.currentLocation
      const rPrev = newState.ghosts.RED.prevLocation
      const pPrev = newState.ghosts.PINK.prevLocation
      const bPrev = newState.ghosts.BLUE.prevLocation
      const oPrev = newState.ghosts.ORANGE.prevLocation

      const redChoose = [
        {location: newState.gameMap[rLocation.y][rLocation.x + 1], direction: 'Right'},
        {location: newState.gameMap[rLocation.y][rLocation.x - 1], direction: 'Left'},
        {location: newState.gameMap[rLocation.y + 1][rLocation.x], direction: 'Down'},
        {location: newState.gameMap[rLocation.y - 1][rLocation.x], direction: 'Up'}];

      let wallFilterRed = redChoose.filter(tile => tile?.location?.canVisit === true)
      let redBacktrackingFilter = wallFilterRed.filter(tile => tile?.location !== newState.gameMap[rPrev.y][rPrev.x])
      let redChooseTile = arrayRandElement(redBacktrackingFilter)
      if (!redChooseTile) {
        if (rLocation.x <= 0) {
          redChooseTile = {location: {x: 27, y: rPrev.y}, direction: 'Left'}
        }
        if (rLocation.x >= 27) {
          redChooseTile = {location: {x: 0, y: rPrev.y}, direction: 'Right'}
        }
      }
      newState.ghosts.RED.currentLocation = {y: redChooseTile.location.y, x: redChooseTile.location.x}
      newState.ghosts.RED.prevLocation = rLocation
      newState.ghosts.RED.direction = redChooseTile.direction
      newState.gameMap[redChooseTile.location.y][redChooseTile.location.x].ghostHere = 'RED'
      newState.gameMap[rLocation.y][rLocation.x].ghostHere = null

      const pinkChoose = [
        {location: newState.gameMap[pLocation.y][pLocation.x + 1], direction: 'Right'},
        {location: newState.gameMap[pLocation.y][pLocation.x - 1], direction: 'Left'},
        {location: newState.gameMap[pLocation.y + 1][pLocation.x], direction: 'Down'},
        {location: newState.gameMap[pLocation.y - 1][pLocation.x], direction: 'Up'}];

      let wallFilterPink = pinkChoose.filter(tile => tile?.location?.canVisit === true)
      let pinkBacktrackingFilter = wallFilterPink.filter(tile => tile?.location !== newState.gameMap[pPrev.y][pPrev.x])
      let pinkChooseTile = arrayRandElement(pinkBacktrackingFilter)
      if (!pinkChooseTile) {
        if (pLocation.x <= 0) {
          pinkChooseTile = {location: {x: 27, y: pPrev.y}, direction: 'Left'}
        }
        if (pLocation.x >= 27) {
          pinkChooseTile = {location: {x: 0, y: pPrev.y}, direction: 'Right'}
        }
      }
      newState.ghosts.PINK.currentLocation = {y: pinkChooseTile.location.y, x: pinkChooseTile.location.x}
      newState.ghosts.PINK.prevLocation = pLocation
      newState.ghosts.PINK.direction = pinkChooseTile.direction
      newState.gameMap[pinkChooseTile.location.y][pinkChooseTile.location.x].ghostHere = 'PINK'
      newState.gameMap[pLocation.y][pLocation.x].ghostHere = null

      const blueChoose = [
        {location: newState.gameMap[bLocation.y][bLocation.x + 1], direction: 'Right'},
        {location: newState.gameMap[bLocation.y][bLocation.x - 1], direction: 'Left'},
        {location: newState.gameMap[bLocation.y + 1][bLocation.x], direction: 'Down'},
        {location: newState.gameMap[bLocation.y - 1][bLocation.x], direction: 'Up'}];

      let wallFilterBlue = blueChoose.filter(tile => tile?.location?.canVisit === true)
      let blueBacktrackingFilter = wallFilterBlue.filter(tile => tile?.location !== newState.gameMap[bPrev.y][bPrev.x])
      let blueChooseTile = arrayRandElement(blueBacktrackingFilter)
      if (!blueChooseTile) {
        if (bLocation.x <= 0) {
          blueChooseTile = {location: {x: 27, y: bPrev.y}, direction: 'Left'}
        }
        if (bLocation.x >= 27) {
          blueChooseTile = {location: {x: 0, y: bPrev.y}, direction: 'Right'}
        }
      }
      newState.ghosts.BLUE.currentLocation = {y: blueChooseTile.location.y, x: blueChooseTile.location.x}
      newState.ghosts.BLUE.prevLocation = bLocation
      newState.ghosts.BLUE.direction = blueChooseTile.direction
      newState.gameMap[blueChooseTile.location.y][blueChooseTile.location.x].ghostHere = 'BLUE'
      newState.gameMap[bLocation.y][bLocation.x].ghostHere = null

      const orangeChoose = [
        {location: newState.gameMap[oLocation.y][oLocation.x + 1], direction: 'Right'},
        {location: newState.gameMap[oLocation.y][oLocation.x - 1], direction: 'Left'},
        {location: newState.gameMap[oLocation.y + 1][oLocation.x], direction: 'Down'},
        {location: newState.gameMap[oLocation.y - 1][oLocation.x], direction: 'Up'}]

      let wallFilterOrange = orangeChoose.filter(tile => tile?.location?.canVisit === true)
      let orangeBacktrackingFilter = wallFilterOrange.filter(tile => tile?.location !== newState.gameMap[oPrev.y][oPrev.x])
      let orangeChooseTile = arrayRandElement(orangeBacktrackingFilter)
      if (!orangeChooseTile) {
        if (oLocation.x <= 0) {
          orangeChooseTile = {location: {x: 27, y: oPrev.y}, direction: 'Left'}
        }
        if (oLocation.x >= 27) {
          orangeChooseTile = {location: {x: 0, y: oPrev.y}, direction: 'Right'}
        }
      }
      newState.ghosts.ORANGE.currentLocation = {y: orangeChooseTile.location.y, x: orangeChooseTile.location.x}
      newState.ghosts.ORANGE.prevLocation = oLocation
      newState.ghosts.ORANGE.direction = orangeChooseTile.direction
      newState.gameMap[orangeChooseTile.location.y][orangeChooseTile.location.x].ghostHere = 'ORANGE'
      newState.gameMap[oLocation.y][oLocation.x].ghostHere = null

      return newState
    case CONTINUE_GAME:
      newState.gameState = "WIN"
      return newState
    case END_GAME:
      newState.gameState = "END"
      newState.pacman.direction = 'none'
      return newState
  }
};
