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
            <Row row_Idx="0" id="row_0" key="row_0"/>
            <Row row_Idx="1" id="row_1" key="row_1"/>
            <Row row_Idx="2" id="row_2" key="row_2"/>
            <Row row_Idx="3" id="row_3" key="row_3"/>
            <Row row_Idx="4" id="row_4" key="row_4"/>
            <Row row_Idx="5" id="row_5" key="row_5"/>
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            
        </div>
    )
};
export default Board;
