import { createSlice } from "@reduxjs/toolkit";

const Board = function () {
    let cells = []
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2) {
                cells.push({ "row": row, "col": col, "backround": "dark", "dama": false })
            } else {
                cells.push({ "row": row, "col": col, "backround": "light", "dama": false })
            }
        }
    }
    return cells
}

const Pieces = Board().map(item => {
    if (item.row === 1 || item.row === 2) {
        return { ...item, "color": "red" }
    } else if (item.row === 5 || item.row === 6) {
        return { ...item, "color": "blue" }
    } else {
        return { ...item, "color": "" }
    }
})

const backroundColor = function (item) {
    if ((item.row + item.col) % 2) {
        return { ...item, "backround": "dark" }
    } else {
        return { ...item, "backround": "light" }
    }
}

export const gameSlice = createSlice({
    name: "game",
    initialState: {
        pieces: Pieces,
        selected: null,
        turn: "blue",
        unchangeable: false,
    },
    reducers: {
        playerMoveClick: (state, action) => {
            const { index } = action.payload;
            if (state.pieces[index].color === state.turn && !state.unchangeable) {
                if (state.selected === null) {
                    state.pieces[index] = { ...state.pieces[index], color: "selected" }
                    state.selected = action.payload
                } else {
                    state.pieces[state.selected.index] = state.selected.item;
                    state.pieces[index] = { ...state.pieces[index], color: "selected" }
                    state.selected = action.payload;
                }
            }
        },
        possibleMoves: (state, action) => {
            const { index, item } = action.payload;
            const otherColor = state.turn === "blue" ? "red" : "blue";
            if (item.color === state.turn && !state.unchangeable) {
                if (item.dama) {
                    let checkForUp = false;
                    let checkForDown = false;
                    let checkForRight = false;
                    let checkForLeft = false;

                    let damaRow = state.selected.item.row;
                    let damaCol = state.selected.item.col;


                    for (let i = 1; i < 7 - damaRow; i++) {
                        if (state.pieces[8 * (damaRow + i) + damaCol].color === otherColor) {
                            if (!state.pieces[8 * (damaRow + i + 1) + damaCol].color) {
                                checkForUp = (damaRow + i + 1)
                                break
                            }
                            break
                        } else if (state.pieces[8 * (damaRow + i) + damaCol].color === state.turn) {
                            break
                        }
                    }
                    for (let i = 1; i < damaRow; i++) {
                        if (state.pieces[8 * (damaRow - i) + damaCol].color === otherColor) {
                            if (!state.pieces[8 * (damaRow - i - 1) + damaCol].color) {
                                checkForDown = (damaRow - i)
                                break
                            }
                            break
                        } else if (state.pieces[8 * (damaRow - i) + damaCol].color === state.turn) {
                            break
                        }
                    }


                    for (let i = 1; i < 7 - damaCol; i++) {
                        if (state.pieces[8 * damaRow + damaCol + i].color === otherColor) {
                            if (!state.pieces[8 * damaRow + damaCol + i + 1].color) {
                                checkForRight = damaCol + i + 1
                                break
                            }
                            break
                        } else if (state.pieces[8 * damaRow + damaCol + i].color === state.turn) {
                            break
                        }
                    }
                    for (let i = 1; i < damaCol; i++) {
                        if (state.pieces[8 * damaRow + damaCol - i].color === otherColor) {
                            if (!state.pieces[8 * damaRow + damaCol - i - 1].color) {
                                checkForLeft = damaCol - i
                                break
                            }
                            break
                        } else if (state.pieces[8 * damaRow + damaCol - i].color === state.turn) {
                            break
                        }
                    }
                    if (checkForUp || checkForDown || checkForRight || checkForLeft) {
                        state.pieces = state.pieces.map(piece => (backroundColor(piece)));
                        if (checkForUp) {
                            for (let i = 0; i <= 7 - checkForUp; i++) {
                                if (!state.pieces[(checkForUp + i) * 8 + damaCol].color) {
                                    state.pieces[(checkForUp + i) * 8 + damaCol].backround = "highlight"
                                } else {
                                    break
                                }
                            }
                        }
                        if (checkForDown) {
                            for (let i = 0; i < checkForDown; i++) {
                                if (!state.pieces[(checkForDown - i - 1) * 8 + damaCol].color) {
                                    state.pieces[(checkForDown - i - 1) * 8 + damaCol].backround = "highlight"
                                } else {
                                    break
                                }
                            }
                        }
                        if (checkForRight) {
                            for (let i = 0; i <= 7 - checkForRight; i++) {
                                if (!state.pieces[checkForRight + i + 8 * damaRow].color) {
                                    state.pieces[checkForRight + i + 8 * damaRow].backround = "highlight"
                                } else {
                                    break
                                }
                            }
                        }
                        if (checkForLeft) {
                            for (let i = 0; i < checkForLeft; i++) {
                                if (!state.pieces[checkForLeft - i - 1 + 8 * damaRow].color) {
                                    state.pieces[checkForLeft - i - 1 + 8 * damaRow].backround = "highlight"
                                } else {
                                    break
                                }
                            }
                        }
                    } else {
                        state.pieces = state.pieces.map(piece => (backroundColor(piece)));
                        for (let i = 1; i < 8 - damaRow; i++) {
                            if (!state.pieces[8 * (damaRow + i) + damaCol].color) {
                                state.pieces[8 * (damaRow + i) + damaCol].backround = "highlight"
                            } else {
                                break
                            }
                        }
                        for (let i = 1; i < damaRow + 1; i++) {
                            if (!state.pieces[8 * (damaRow - i) + damaCol].color) {
                                state.pieces[8 * (damaRow - i) + damaCol].backround = "highlight"
                            } else {
                                break
                            }
                        }
                        for (let i = 1; i < 8 - damaCol; i++) {
                            if (!state.pieces[8 * damaRow + (damaCol + i)].color) {
                                state.pieces[8 * damaRow + (damaCol + i)].backround = "highlight"
                            } else {
                                break
                            }
                        }
                        for (let i = 1; i < damaCol + 1; i++) {
                            if (!state.pieces[8 * damaRow + (damaCol - i)].color) {
                                state.pieces[8 * damaRow + (damaCol - i)].backround = "highlight"
                            } else {
                                break
                            }
                        }
                    }
                } else {
                    const possibleRow = state.turn === "blue" ? -8 : 8;
                    const checkForRow = (state.pieces[index + possibleRow]?.color === otherColor && !state.pieces[index + possibleRow * 2].color) ? true : false;
                    const checkForColumnPlus = (state.pieces[index + 1]?.color === otherColor && !state.pieces[index + 2].color && state.pieces[index + 2].row === item.row) ? true : false;
                    const checkForColumnMinus = (state.pieces[index - 1]?.color === otherColor && !state.pieces[index - 2].color && state.pieces[index - 2].row === item.row) ? true : false;

                    state.pieces = state.pieces.map(piece => (backroundColor(piece)))
                    if (checkForRow || checkForColumnPlus || checkForColumnMinus) {
                        if (checkForRow) {
                            state.pieces[index + possibleRow * 2].backround = "highlight"
                        }
                        if (checkForColumnPlus) {
                            state.pieces[index + 2].backround = "highlight"
                        }
                        if (checkForColumnMinus) {
                            state.pieces[index - 2].backround = "highlight"
                        }
                    } else {
                        [-1, 1].forEach(num => {
                            if (!state.pieces[index + num].color && state.pieces[index + num].row === item.row) {
                                state.pieces[index + num].backround = "highlight"
                            }
                        })
                        if (!state.pieces[index + possibleRow].color) {
                            state.pieces[index + possibleRow].backround = "highlight"
                        }
                    }
                }


            }
        }
        ,
        move: (state, action) => {
            const { index, item } = action.payload;
            let possibleRow = state.turn === "blue" ? -8 : 8;
            const color = (item.row + item.col) % 2 ? "dark" : "light";
            const otherColor = state.turn === "blue" ? "red" : "blue";
            if (item.backround === "highlight") {
                if (state.selected.item.dama) {
                    state.pieces[index] = { ...state.pieces[index], "color": state.turn, "dama": true }
                    state.pieces[state.selected.index] = { ...state.pieces[state.selected.index], "color": "", "dama": false }
                  
                    state.pieces = state.pieces.map(piece => backroundColor(piece));
                    if (Math.abs(index - state.selected.index) > 15) {
                        for (let i = Math.min(state.selected.index, index) + 8; i < Math.max(state.selected.index, index); i += 8) {
                            if (state.pieces[i].color) {
                                state.pieces[i].color = ""
                                state.pieces[i].dama = false
                                state.unchangeable = true
                            }
                        }
                    } else if (1 < Math.abs(index - state.selected.index) && Math.abs(index - state.selected.index) < 8) {
                        for (let i = Math.min(state.selected.index, index) + 1; i < Math.max(state.selected.index, index); i++) {
                            if (state.pieces[i].color) {
                                state.pieces[i].color = ""
                                state.unchangeable = true
                            }
                        }
                    }
                   
                    if (state.unchangeable) {
                    
                        let checkForUp = false;
                        let checkForDown = false;
                        let checkForRight = false;
                        let checkForLeft = false;

                        let damaRow = item.row;
                        let damaCol = item.col;

                        for (let i = 1; i < 7 - damaRow; i++) {
                            if (state.pieces[8 * (damaRow + i) + damaCol].color === otherColor) {
                                if (!state.pieces[8 * (damaRow + i + 1) + damaCol].color) {
                                    checkForUp = (damaRow + i + 1)
                                    break
                                }
                                break
                            } else if (state.pieces[8 * (damaRow + i) + damaCol].color === state.turn) {
                                break
                            }
                        }
                        for (let i = 1; i < damaRow; i++) {
                            if (state.pieces[8 * (damaRow - i) + damaCol].color === otherColor) {
                                if (!state.pieces[8 * (damaRow - i - 1) + damaCol].color) {
                                    checkForDown = (damaRow - i)
                                    break
                                }
                                break
                            } else if (state.pieces[8 * (damaRow - i) + damaCol].color === state.turn) {
                                break
                            }
                        }


                        for (let i = 1; i < 7 - damaCol; i++) {
                            if (state.pieces[8 * damaRow + damaCol + i].color === otherColor) {
                                if (!state.pieces[8 * damaRow + damaCol + i + 1].color) {
                                    checkForRight = damaCol + i + 1
                                    break
                                }
                                break
                            } else if (state.pieces[8 * damaRow + damaCol + i].color === state.turn) {
                                break
                            }
                        }
                        for (let i = 1; i < damaCol; i++) {
                            if (state.pieces[8 * damaRow + damaCol - i].color === otherColor) {
                                if (!state.pieces[8 * damaRow + damaCol - i - 1].color) {
                                    checkForLeft = damaCol - i
                                    break
                                }
                                break
                            } else if (state.pieces[8 * damaRow + damaCol - i].color === state.turn) {
                                break
                            }
                        }
                        if (checkForUp || checkForDown || checkForRight || checkForLeft) {
                            if (checkForUp) {
                                for (let i = 0; i <= 7 - checkForUp; i++) {
                                    if (!state.pieces[(checkForUp + i) * 8 + damaCol].color) {
                                        state.pieces[(checkForUp + i) * 8 + damaCol].backround = "highlight"
                                    } else {
                                        break
                                    }
                                }
                            }
                            if (checkForDown) {
                                for (let i = 0; i < checkForDown; i++) {
                                    if (!state.pieces[(checkForDown - i - 1) * 8 + damaCol].color) {
                                        state.pieces[(checkForDown - i - 1) * 8 + damaCol].backround = "highlight"
                                    } else {
                                        break
                                    }
                                }
                            }
                            if (checkForRight) {
                                for (let i = 0; i <= 7 - checkForRight; i++) {
                                    if (!state.pieces[checkForRight + i + 8 * damaRow].color) {
                                        state.pieces[checkForRight + i + 8 * damaRow].backround = "highlight"
                                    } else {
                                        break
                                    }
                                }
                            }
                            if (checkForLeft) {
                                for (let i = 0; i < checkForLeft; i++) {
                                    if (!state.pieces[checkForLeft - i - 1 + 8 * damaRow].color) {
                                        state.pieces[checkForLeft - i - 1 + 8 * damaRow].backround = "highlight"
                                    } else {
                                        break
                                    }
                                }
                            }
                            state.selected = {index:index,item:{...state.pieces[index],"dama":true}}
                        } else {
                            state.unchangeable = false
                            state.turn = otherColor
                            state.selected = null
                        }
                    } else {
                     
                        state.turn = otherColor
                        state.selected = null
                    }

                } else {

                    const indexGap = state.selected.index - index;
                    if (state.turn === "blue" && item.row === 0) {
                        state.pieces[index] = { ...state.pieces[index], "dama": true }
                        state.pieces = state.pieces.map(piece => backroundColor(piece))
                    } else if (state.turn === "red" && item.row === 7) {
                        state.pieces[index] = { ...state.pieces[index], "dama": true }
                        state.pieces = state.pieces.map(piece => backroundColor(piece))
                    }
                    if (indexGap === -possibleRow || Math.abs(indexGap) === 1) {
                        state.pieces[index] = { ...state.pieces[index], "color": state.turn, "backround": `${color}` };
                        state.pieces[state.selected.index] = { ...state.pieces[state.selected.index], "color": "" };
                        [-1, 1, possibleRow].forEach(num => (
                            state.pieces[state.selected.index + num] = { ...state.pieces[state.selected.index + num], "backround": `${(state.pieces[state.selected.index + num].row + state.pieces[state.selected.index + num].col) % 2 ? "dark" : "light"}` }
                        ))
                        state.selected = null
                        state.turn = otherColor;
                    } else {
                        state.pieces[(index + state.selected.index) / 2] = { ...state.pieces[(index + state.selected.index) / 2], "color": "" ,"dama":false};
                        state.pieces[state.selected.index] = { ...state.pieces[state.selected.index], "color": "" };
                        state.unchangeable = true
                        state.selected = action.payload;
                        const checkForRow = (state.pieces[index + possibleRow]?.color === otherColor && !state.pieces[index + possibleRow * 2].color) ? true : false;
                        const checkForColumnPlus = (state.pieces[index + 1]?.color === otherColor && !state.pieces[index + 2].color && state.pieces[index + 2].row === item.row) ? true : false;
                        const checkForColumnMinus = (state.pieces[index - 1]?.color === otherColor && !state.pieces[index - 2].color && state.pieces[index - 2].row === item.row) ? true : false;

                        if (checkForRow || checkForColumnPlus || checkForColumnMinus) {
                            state.pieces = state.pieces.map(piece => backroundColor(piece))
                            if (checkForRow) {
                                state.pieces[index + possibleRow * 2] = { ...state.pieces[index + possibleRow * 2], "backround": "highlight" }
                            }
                            if (checkForColumnPlus) {
                                state.pieces[index + 2] = { ...state.pieces[index + 2], "backround": "highlight" }
                            }
                            if (checkForColumnMinus) {
                                state.pieces[index - 2] = { ...state.pieces[index - 2], "backround": "highlight" }
                            }
                            state.pieces[index] = { ...state.pieces[index], "color": "selected", "backround": `${color}` };
                            state.selected = action.payload;
                        } else {
                            state.pieces[index] = { ...state.pieces[index], "color": state.turn, "backround": `${color}` };
                            state.turn = otherColor
                            state.unchangeable = false
                            state.selected = null
                            state.pieces = state.pieces.map(piece => (backroundColor(piece)));
                        }
                    }
                }

            }
        }
    }
})

export const { playerMoveClick, possibleMoves, move } = gameSlice.actions;

export default gameSlice.reducer;