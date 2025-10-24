let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");

// 1️⃣ Start Game
function startGame() {
  cells.forEach(cell => cell.addEventListener("click", handleClick));
  restartBtn.addEventListener("click", resetGame);
  message.textContent = `Player ${currentPlayer}'s turn`;
}

// 2️⃣ Handle Click
function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.color = currentPlayer === "X" ? "#66ccff" : "#aee6ff";

  if (checkWinner()) {
    message.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  switchPlayer();
}

// 3️⃣ Check Winner
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// 4️⃣ Switch Player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;
}

// 5️⃣ Reset Game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
  });
}

// 🚀 Start the game when page loads
startGame();
