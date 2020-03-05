import Player from "./player.js";
import Table from "./board.js";

const view = (() => {
  const displayBoard = board => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.innerHTML = board.t[i];
    });
  };

  // inputPlayers = () => {};
  // winnerCelebration = () => {};
  return { displayBoard };
})();

const controller = (view => {
  let t = Table(),
    p1 = Player("Macnick", "X"),
    p2 = Player("Daniel", "O"),
    currentPlayer = p1;

  const addListeners = t => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.addEventListener("click", putSymbol, false);
    });
  };

  const highlightPlayer = () => {
    if (currentPlayer == p1) {
      document.getElementById("p1").style.setProperty("color", "var(--box)");
      document.getElementById("p2").style.setProperty("color", "var(--letter)");
    } else {
      document.getElementById("p1").style.setProperty("color", "var(--letter)");
      document.getElementById("p2").style.setProperty("color", "var(--box)");
    }
  };

  const putSymbol = e => {
    if (e.target.innerHTML == "") {
      t.t[e.target.id] = currentPlayer.getMarker();
      if (checkWinner(t.t)) alert(`Winner is ${currentPlayer.getName()}`);
      view.displayBoard(t);
      // change player
      currentPlayer = currentPlayer == p1 ? p2 : p1;
      highlightPlayer();
    }
  };

  const checkWinner = board => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];
    let winner = false;
    winConditions.forEach(row => {
      if (
        board[row[0]] == board[row[1]] &&
        board[row[1]] == board[row[2]] &&
        (board[row[0]] == "X" || board[row[0]] == "O")
      ) {
        winner = true;
      }
    });
    return winner;
  };
  // t.t[4] = "X";
  // t.t[2] = "O";
  // t.t[0] = "X";
  // console.log(t.t);
  addListeners(t);
  view.displayBoard(t);

  return { t, currentPlayer };
  // inputMove;

  // checkValidMove;

  // checkWinner;

  // checkEndGame;
})(view);
