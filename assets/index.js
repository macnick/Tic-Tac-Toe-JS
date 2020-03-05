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
    p1 = Player("Name1", "X"),
    p2 = Player("Anonymous", "O"),
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
      // change player
      currentPlayer = currentPlayer == p1 ? p2 : p1;
      highlightPlayer();
      view.displayBoard(t);
    }
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
