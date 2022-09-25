import { useSelector} from "react-redux";
import { Cells } from "./cells";

export function Board() {
    const pieces = useSelector(state => state.game.pieces);
    return (
        <div className="checkers-board">
            {pieces.map((item, index) => (
                <Cells item={item} key={index} index={index}/>
            ))
            }
        </div>
    );
}


