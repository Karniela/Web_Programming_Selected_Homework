/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div className='Row-wordbox' id= {String(`${rowIdx}-0`)} key= {String(`${rowIdx}-0`)}>{letters[0]}</div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-1`)} key= {String(`${rowIdx}-1`)}>{letters[1]}</div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-2`)} key= {String(`${rowIdx}-2`)}>{letters[2]}</div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-3`)} key= {String(`${rowIdx}-3`)}>{letters[3]}</div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-4`)} key= {String(`${rowIdx}-4`)}>{letters[4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
