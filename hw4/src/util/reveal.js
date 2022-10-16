/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    if (board[x][y].revealed ===true){
      return
    }else{
      //console.log(board[x][y].value);
      const limitNum = board.length-1;
      board[x][y].revealed = true;
      newNonMinesCount--;
      console.log(limitNum);

      //排除第一列和第一行的狀況（不能<0）
      if(x>0 && board[x][y].value === 0 && board[x-1][y].revealed === false && board[x-1][y].flagged === false && board[x-1][y].value !== '💣'){
        board[x-1][y].revealed = true;
        newNonMinesCount--;
      }
      
      if(y>0 && board[x][y].value === 0 && board[x][y-1].revealed === false && board[x][y-1].flagged === false && board[x][y-1].value !== '💣'){
        board[x][y-1].revealed = true;
        newNonMinesCount--;
      }

      if(x>0 && y>0 && board[x][y].value === 0 && board[x-1][y-1].revealed === false && board[x-1][y-1].flagged === false && board[x-1][y-1].value !== '💣'){
        board[x-1][y-1].revealed = true;
        newNonMinesCount--;
      }
      //排除第一列和第一行的狀況（不能<0）
      
      if(x<limitNum && board[x][y].value === 0 && board[x+1][y].revealed === false && board[x+1][y].flagged === false && board[x+1][y].value !== '💣'){
        board[x+1][y].revealed = true;
        newNonMinesCount--;
      }

      if(y<limitNum && board[x][y].value === 0 && board[x][y+1].revealed === false && board[x][y+1].flagged === false && board[x][y+1].value !== '💣'){
        board[x][y+1].revealed = true;
        newNonMinesCount--;
      }

      if(x<limitNum && y<limitNum && board[x][y].value === 0 && board[x+1][y+1].revealed === false && board[x+1][y+1].flagged === false && board[x+1][y+1].value !== '💣'){
        board[x+1][y+1].revealed = true;
        newNonMinesCount--;
      }
      
      if(x>0 && y<limitNum && board[x][y].value === 0 && board[x-1][y+1].revealed === false && board[x-1][y+1].flagged === false && board[x-1][y+1].value !== '💣'){
        board[x-1][y+1].revealed = true;
        newNonMinesCount--;
      }

      if(y>0 && x<limitNum && board[x][y].value === 0 && board[x+1][y-1].revealed === false && board[x+1][y-1].flagged === false && board[x+1][y-1].value !== '💣'){
        board[x+1][y-1].revealed = true;
        newNonMinesCount--;
      }

    }
    
    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

    return { board, newNonMinesCount };
};
