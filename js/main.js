/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'purple',
    '-1': 'orange',
};

/*----- state variables -----*/
let board; // array of 7 column arrays
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1 = winner; "T" = tie

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const markerEls = [...document.querySelectorAll('#markers > div')];

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

// initialize all state, then call render()
function init() {
    // to visualize the board's mapping to the DOM,
    // rotate the board array 90 degrees counter-clockwise
    board = [
        [0,0,0,0,0,0], //col 0
        [0,0,0,0,0,0], //col 1
        [0,0,0,0,0,0], //col 2
        [0,0,0,0,0,0], //col 3
        [0,0,0,0,0,0], //col 4
        [0,0,0,0,0,0], //col 5
        [0,0,0,0,0,0], //col 6
    ];
    turn = 1;
    winner = null;
    render();
}

// in response to use interaction, update all impacted
// state, then call render();
function handleDrop(evt){
    const colIdx = markerEls.indexOf(evt.target);
    // Guards...
    if (colIdx === -1) return;
    // Shortcut to the column array
    const colArr = board[colIdx];
    // Find the index of the first 0 in colArr
    const rowIdx = colArr.indexOf(0);
    // Update the board state with the cur player value (turn)
    colArr[rowIdx] = turn;
    // Switch player turn
    turn *= -1;
    // check for winner
    winner = getWinner(colIdx, rowIdx);
    render();
}

// check for winner in board state and
// return null if no winner, 1/-1 if a player has won, 'T' if tie
function getWinner(colIdx, rowIdx) {
    return checkVerticalWin(colIdx, rowIdx) ||
    checkHorizontalWin(colIdx, rowIdx) ||
    checkDiagonalWinNESW(colIdx, rowIdx) ||
    checkDiagonalWinNWSE(colIdx, rowIdx);
}

function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1);
    return (adjCountNW + adjCountSE) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkDiagonalWinNESW(colIdx, rowIdx) {
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1 , -1);
    const adjCountSW = countAdjacent(colIdx, rowIdx, 1 , -1);
    return (adjCountNE + adjCountSW) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkHorizontalWin(colIdx, rowIdx) {
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0);
    return (adjCountLeft + adjCountRight) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkVerticalWin(colIdx, rowIdx) {
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null;
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    //shortcut variable to the player value
    const player = board[colIdx][rowIdx];
    // track count of adjacent cells with the same player value
    let count = 0
    // initialize new coordinates
    colIdx += colOffset;
    rowIdx += rowOffset;
    while (
        // ensure colIdx is within bounds of the board array
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        count ++;
        colIdx += colOffset;
        rowIdx += rowOffset;
    }
    return count;
}

// visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage();
    // hide/show UI elements (controls
    renderControls();
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        // iterate over the cells in the current column (collArr)
        colArr.forEach(function(cellVal, rowIdx){
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });
}

function renderMessage() {
    if (winner === 'T'){
        messageEl.innerText = "It's a tie!!!";
    } else if (winner){
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
    } else {
        //Game is in play
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function renderControls() {
    // Ternary expression is the go to when you want 1 of 2 values returned
    // <conditional exp> ? <truthy exp> : <falsy exp>
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
    // Iterate over the marker elements to hide/show
    // according to the column being full (no 0's) or not
    markerEls.forEach(function(markerEl, colIdx){
        const hideMarker = !board[colIdx].includes(0) || winner;
        markerEl.style.visibility = hideMarker ? 'hidden' : 'visible';
    });
}