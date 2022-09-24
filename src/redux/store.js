import { configureStore } from "@reduxjs/toolkit";
import gameSliceReducer from "./gameSlice";

export const store = configureStore({
    reducer: {
        game: gameSliceReducer
    }
})