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
    currentPlayer = p1,
    game = true;

  const addListeners = t => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.addEventListener("click", putSymbol);
    });
    document.getElementById("reset").addEventListener("click", resetBoard);
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
    if (e.target.innerHTML == "" && game) {
      t.t[e.target.id] = currentPlayer.getMarker();
      // here we check if we have a winning move. Currently just console.log the name
      if (checkWinner(t.t)) {
        console.log(`Winner is ${currentPlayer.getName()}`);
        game = false;
      }
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

  const resetBoard = () => {
    t = Table();
    currentPlayer = p1;
    highlightPlayer();
    view.displayBoard(t);
    game = true;
  };

  addListeners(t);
  view.displayBoard(t);

  return { t, currentPlayer, resetBoard };

  // checkWinner;

  // checkEndGame;
})(view);
