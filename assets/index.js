import Player from "./player.js";
import Table from "./board.js";

const view = (() => {
  const displayBoard = board => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.innerHTML = board.t[i];
    });
  };

  const showPlayerNames = (p1, p2) => {
    document
      .getElementById("player1")
      .setAttribute("placeholder", p1.getName());
    document
      .getElementById("player2")
      .setAttribute("placeholder", p2.getName());
  };
  const showModal = () => {
    const m = document.getElementsByClassName('modal-popup');
    m[0].style.display = 'block';
  },
  const closeModal = () => {
    const m = document.getElementsByClassName('modal-popup');
    m[0].style.display = 'none';
  }
  // winnerCelebration = () => {};
  return { displayBoard, showPlayerNames, showModal, closeModal };
})();

// self-contained module
const controller = (view => {
  let t = Table(),
    p1,
    p2,
    currentPlayer = p1,
    game = false;

  const getNames = () => {
    let player1 = document.getElementById("player1"),
      player2 = document.getElementById("player2");
    player1.value == "" ? (player1 = "X") : (player1 = player1.value);
    player2.value == "" ? (player2 = "O") : (player2 = player2.value);
    return [player1, player2];
  };

  const addListeners = t => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.addEventListener("click", putSymbol);
    });
    document.getElementById("reset").addEventListener("click", resetBoard);
    document.getElementById("play").addEventListener("click", newGame);
  };

  const highlightPlayer = () => {
    if (currentPlayer == p1) {
      document
        .getElementById("player1")
        .style.setProperty("color", "var(--box)");
      document
        .getElementById("player2")
        .style.setProperty("color", "var(--letter)");
    } else {
      document
        .getElementById("player1")
        .style.setProperty("color", "var(--letter)");
      document
        .getElementById("player2")
        .style.setProperty("color", "var(--box)");
    }
  };

  const putSymbol = e => {
    if (e.target.innerHTML == "" && game) {
      t.t[e.target.id] = currentPlayer.getMarker();
      // here we check if we have a winning move. Currently just console.log the name
      view.displayBoard(t);
      if (checkWinner(t.t)) {
        console.log(`Winner is ${currentPlayer.getName()}`);
        game = false;
      } else if (isItATie()) {
        // give the option to start again
        alert("It is a tie!");
      }
      // change player
      currentPlayer = currentPlayer == p1 ? p2 : p1;
      highlightPlayer();
    }
  };

  const isItATie = () => {
    return t.t.every(pos => pos != null);
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
    p1 = Player(getNames()[0], "X");
    p2 = Player(getNames()[1], "O");
    currentPlayer = p1;
    view.showPlayerNames(p1, p2);
    highlightPlayer();
    view.displayBoard(t);
    game = true;
  };

  addListeners(t);
  view.displayBoard(t);

  return { t, currentPlayer, resetBoard };
})(view);
