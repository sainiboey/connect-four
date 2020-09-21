/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let x=0;x<HEIGHT;x++){
    let temp=[];
    for(let y=0;y<WIDTH;y++){
      temp.push("");
    }
    board.push(temp);
  }
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  //  get "htmlBoard" variable from the item in HTML w/ID of "board"
  htmlBoard = document.getElementById('board');

  // create the row for column top and append it to the table
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // make the main part of the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // it return the y variable for empty spot or return null
  for( let y = HEIGHT-1; y >= 0 ; y-- ) {
    if( board[y][x] === "" )
      {
        return y;
      }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //  make a div and insert into correct table cell
  let piece = document.createElement('div');
  piece.classList.add('piece');
  //still working on animations
  //piece.style.top = `{-100*(y+2)}px`

  piece.classList.add(`player${currPlayer}`);

  /*if (currPlayer==1){
    piece.classList.add('player1');
    currPlayer=2;
  }
  else if (currPlayer==2){
    piece.classList.add('player2');
    currPlayer=1;
  }*/

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
  console.log(spot);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
  let tds = document.querySelector("#column-top");
  tds.removeEventListener("click",handleClick);
  
} 

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
    }

  // check for tie
  if(checkForTie()){
    return endGame(" players have tie");
  }
  

  // switch players
  //  switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

//function to calculate tie
function checkForTie() {
  return board.every((array)=>array.every((element)=>element!==""));
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //check the height
    for (let x = 0; x < WIDTH; x++) {//check the width
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];//check th four consecutive horizontal values
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];//check the four consecutive vertical values
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];//check the diagonal values from left to right
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];//check the diagonal value from right to left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
