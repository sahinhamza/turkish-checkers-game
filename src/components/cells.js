import { useSelector, useDispatch } from "react-redux";
import { playerMoveClick, possibleMoves, move } from "../redux/gameSlice";

export function Cells({ item, index }) {
    const selected = useSelector(state => state.game.selected)
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(playerMoveClick({ index, item }));
        dispatch(possibleMoves({ index, item }));
        dispatch(move({ index, item }));
        console.log(selected)
    }
   

    return (
        <div
            className={`checkers-field-${item.backround}`}
        >
            <div className={
                item.color ?
                    item.dama ?
                        `checkers-piece checkers-piece-${item.color}-dama` :
                        `checkers-piece checkers-piece-${item.color}` :
                    "checkers-piece"
            }
                onClick={() => clickHandler()}
            />

        </div>
    );
}
