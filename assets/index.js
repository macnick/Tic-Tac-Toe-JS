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
    p2 = Player("Anonymous", "0"),
    currentPlayer = p1;

  const addListeners = t => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.addEventListener("click", putSymbol, false);
    });
  };

  const putSymbol = e => {
    console.log(e.target.innerHTML);
    if (e.target.innerHTML == "") {
      t.t[e.target.id] = currentPlayer.getMarker();
      // change player
      currentPlayer = currentPlayer == p1 ? p2 : p1;
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
