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

// visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage();
    // hide/show UI elements (controls
    renderControls();)
}

function renderBoard() {

}

function renderMessage() {

}

function renderControls() {
    
}