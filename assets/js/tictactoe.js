// tictactoe.js

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById('board').children[index].innerText = currentPlayer;
        
        if (checkWinner()) {
            document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (!gameBoard.includes('')) {
            document.getElementById('status').innerText = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}
//restart game  function to tictactoe.js
function restartGame() {
    // Reset game-related variables and clear the board
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Clear the cell content on the HTML board
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
    });

    // Update status message
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
}


function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}


function calculateSlope() {
    const D = parseFloat(document.getElementById("pipeDiameter").value);
    const L = parseFloat(document.getElementById("pipeLength").value);
    const SIE = parseFloat(document.getElementById("startInvert").value);
    const E = parseFloat(document.getElementById("endInvert").value);

    if (D <= 0 || L <= 0) {
        alert("Diameter and Length should be positive numbers.");
        return;
    }

    const slopePercentage = ((E - SIE) / L) * 100;
    const ID = E - SIE;
    const slopeRatio = L / ID;

    document.getElementById("slopeResult").textContent = slopePercentage.toFixed(2) + " %";
    document.getElementById("invertDrop").textContent = ID.toFixed(2);
    document.getElementById("slopeRatio").textContent = slopeRatio.toFixed(2);
}

function resetFields() {
    document.getElementById("pipeDiameter").value = "";
    document.getElementById("pipeLength").value = "";
    document.getElementById("startInvert").value = "";
    document.getElementById("endInvert").value = "";
    document.getElementById("slopeResult").textContent = "";
    document.getElementById("invertDrop").textContent = "";
    document.getElementById("slopeRatio").textContent = "";
}
