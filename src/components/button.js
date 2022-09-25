import { useDispatch } from "react-redux";
import { reset } from "../redux/gameSlice";

export function Button() {
    const dispatch = useDispatch();
    return (
        <button onClick={() => dispatch(reset())}>Play Again</button>
    );
}
