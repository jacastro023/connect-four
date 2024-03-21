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
const messageEl = doument.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const markerEls = document.querySelectorAll('#markers > div');

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);

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
    const colIdx = makerEls.indexOf(evt.target);
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
    winner = getWinner();
    render();
}

function getWinner() {

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
        messageEl.innerHTML = `<span style = "color: ${COLORS[winner]}">$COLORS[winner].toUpperCase()}</span>Wins!`;
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