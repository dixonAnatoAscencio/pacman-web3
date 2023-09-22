import style from './gameTile.module.css'
import spriteSheet from '../../../../assets/sprites.png'
import {PacMan} from "./pacman.style";
import {Ghost} from "./ghost.style";
import {useSelector} from "react-redux";

const GameTile = ({tile}) => {
  const {pacman, ghosts, gameState} = useSelector((state) => state)
  let pacmanAnim = pacman.direction
  let ghostType = tile.ghostHere
  let ghostAnim
  if (ghostType !== null) {
     ghostAnim = ghosts[ghostType].direction
  }

  let selectedDiv
  switch (tile.type) {
    case 0:
      selectedDiv = <div className={style.space}>{gameState === "END" && tile.isPacManHere === true ?
        <img src={spriteSheet} alt="END" className={style.death}/> : ghostType !== null ?
          <Ghost src={spriteSheet} alt="GHOST" type={ghostType} animation={ghostAnim}/> : tile.isPacManHere === true ?
            <PacMan src={spriteSheet} alt="PAC" direction={pacmanAnim}/> : tile.visited === false ?
              <div className={style.dot}/> : null} </div>
      break
    case 1:
      selectedDiv = <div className={style.wall}/>
      break
    case 2:
      selectedDiv = <div className={style.space}> {gameState === "END" && tile.isPacManHere === true ?
        <img src={spriteSheet} alt="END" className={style.death}/> : ghostType !== null ?
          <Ghost src={spriteSheet} alt="GHOST" type={ghostType} animation={ghostAnim}/> : tile.isPacManHere === true ?
            <PacMan src={spriteSheet} alt="PAC" direction={pacmanAnim}/> : tile.visited === false ?
              <div className={style.bigDot}/> : null} </div>
      break
    case 3:
      selectedDiv = <div className={style.space}/>
      break
    case 4:
      selectedDiv = <div className={style.space}/>
      break
    case 5:
      selectedDiv =
        <div className={style.space}>{gameState === "END" && tile.isPacManHere === true ?
          <img src={spriteSheet} alt="END" className={style.death}/> : ghostType !== null ?
            <Ghost src={spriteSheet} alt="GHOST" type={ghostType} animation={ghostAnim}/> : tile.isPacManHere === true ?
              <PacMan src={spriteSheet} alt="PAC" direction={pacmanAnim}/> : null}</div>
      break
  }

// 0 - space to direction
// 1 - wall
// 2 - big dot
// 3 - enemy gates
// 4 - enemy territory
// 5 - space without dot


  return (
    selectedDiv
  );
};

export default GameTile;