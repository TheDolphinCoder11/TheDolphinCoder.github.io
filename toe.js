const board = document.getElementById('board');
const status = document.getElementById('status');
const winMessage = document.getElementById('winMessage');
let currentPlayer = '❌';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function showWinAlert(player) {
    alert(`Player ${player} wins!`);
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
        updateStatus();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === '❌' ? '🅾️' : '❌';
}

function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `Player ${currentPlayer} wins!`;
            winMessage.textContent = `Player ${currentPlayer} wins!`;
            
            showWinAlert(currentPlayer);
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        status.textContent = 'It\'s a draw!';
        winMessage.textContent = 'It\'s a draw!';
        
        // Display the draw alert
        alert('It\'s a draw!');
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Player X\'s turn';
    winMessage.textContent = '';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

createBoard();
updateStatus();
