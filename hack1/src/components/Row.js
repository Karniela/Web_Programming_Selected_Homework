/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div className='Row-wordbox' id= {String(`${rowIdx}-0`)} key= {String(`${rowIdx}-0`)}></div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-1`)} key= {String(`${rowIdx}-1`) }></div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-2`)} key= {String(`${rowIdx}-2`) }></div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-3`)} key= {String(`${rowIdx}-3`) }></div>
                <div className='Row-wordbox' id= {String(`${rowIdx}-4`)} key= {String(`${rowIdx}-4`) }></div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;