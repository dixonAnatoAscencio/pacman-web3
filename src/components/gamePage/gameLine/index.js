import style from './gameLine.module.css'
import GameTile from './gameTile'
const GameLine = ({tiles}) => {
    return (
        <div className={style.line}>
            {
                tiles.map((tile, index) => {
                    return <GameTile tile={tile} key={index}/>
                })
            }
        </div>
    );
};

export default GameLine;