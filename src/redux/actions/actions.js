export const gameStart = () => ({
  type: 'START_GAME'
});
export const deployPacman = () => ({
  type: 'DEPLOY_PACMAN'
})
export const moveUp = () => ({
  type: 'MOVE_UP'
})
export const moveDown = () => ({
  type: 'MOVE_DOWN'
})
export const moveLeft = () => ({
  type: 'MOVE_LEFT'
})
export const moveRight = () => ({
  type: 'MOVE_RIGHT'
})
export const setHighscore = () => ({
  type: 'SET_HIGHSCORE'
})
export const continueGame = () => ({
  type: 'CONTINUE_GAME'
})
export const deployGhosts = () => ({
  type: 'DEPLOY_GHOSTS'
})
export const changeDirection = (newDirection) => ({
  type: 'CHANGE_DIRECTION',
  payload: newDirection
})
export const ghostsMoving = () => ({
  type: 'GHOSTS_MOVING'
})
export const endGame = () => ({
  type: 'END_GAME'
})

