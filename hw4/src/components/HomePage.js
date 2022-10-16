/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  const [mineNumber, setmineNumber] = useState(10);
  const [boardSiz, setboardSiz] = useState(8);

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  
  const showDifAdj=()=>{
    if(showPanel!==true){
      setShowPanel(true);
    }else{
      setShowPanel(false);
    }
  }

  const showMineError=(e)=>{
    console.log("showMineError")
    console.log(e.target.value)
    const newmineNumber = e.target.value
    setmineNumber(newmineNumber);
    if (boardSiz * boardSiz < newmineNumber){
      setError(true);
    }else{
      setError(false);
    }
    mineNumOnChange(newmineNumber);
  }

  const showBoardError=(e)=>{
    console.log("showBoardError")
    console.log(e.target.value)
    const newboardSiz = e.target.value
    setboardSiz(newboardSiz);
    if (newboardSiz * newboardSiz <= mineNumber){
      console.log("set true")
      setError(true);
    }else{
      setError(false);
      console.log("set false")
    }
    boardSizeOnChange(newboardSiz);
  }


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className="btn" onClick={startGameOnClick} disabled={error} >Start Game</button>
        
      
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className = 'controlContainer'>
        <button className="btn" onClick={showDifAdj}>Difficulty Adjustment</button>
        {showPanel ? 
        <div className = 'controlWrapper'>
          <div className='error' style = {{ color: (error) ? '#880000':'transparent'}}>ERROR: Mines number and board size are invalid!</div>
          <div className = 'controlCol'>
                <p className="controlTitle">Mines Number</p>
                <input name="mineControl" type="range" step="1" min='1' max='20' defaultValue='10' onChange={showMineError}/>
                <p className = 'controlNum' style = {{ color: (error) ? '#880000':'#0f0f4b'}}>{mineNum}</p>
          </div>
          <div className = 'controlCol'>
                <p className="controlTitle">Board Size(n x n)</p>
                <input name="boardControl" type="range" step="1" min='1' max='20' defaultValue='8' onChange={showBoardError}/>
                <p className = 'controlNum' style = {{ color: (error) ? '#880000':'#0f0f4b'}}>{boardSize}</p>
          </div>
        </div>
         : null}
      </div>

    </div>
  );

}
export default HomePage;   