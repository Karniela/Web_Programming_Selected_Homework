/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    return (
        <div className="Board-container">
            <CurRow rowIdx="0" id="row_0" key="row_0" curGuess={curGuess}/>
            <Row rowIdx="1" id="row_1" key="row_1" guess={guesses[0]}/>
            <Row rowIdx="2" id="row_2" key="row_2" guess={guesses[1]}/>
            <Row rowIdx="3" id="row_3" key="row_3" guess={guesses[2]}/>
            <Row rowIdx="4" id="row_4" key="row_4" guess={guesses[3]}/>
            <Row rowIdx="5" id="row_5" key="row_5" guess={guesses[4]}/>
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            
        </div>
    )
};
export default Board;
