import Player from "/player.js";

const model = (() => {
  const Table = () => {
    const t = [null, null, null, null, null, null, null, null, null];
    return { t };
  };

  // const Player = (name, marker) => {
  //   const getName = () => name;
  //   const getMarker = () => marker;
  //   return { getName, getMarker };
  // };
  return { Table };
})();

const view = (() => {
  const displayBoard = board => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.innerHTML = board.t[i];
      if (box.innerHTML == "") {
        box.addEventListener("click", controller.putSymbol(i));
      }
    });
  };
  // inputPlayers = () => {};
  // winnerCelebration = () => {};
  return { displayBoard };
})();

const controller = ((model, view) => {
  let t = model.Table(),
    p1 = Player("Name1", "X"),
    p2 = Player("Anonymous", "0"),
    currentPlayer = p1;
  const putSymbol = i => {
    let box = document.getElementById(i);
    box.innerHTML = currentPlayer.getMarker();
    // change player
    currentPlayer = currentPlayer == p1 ? p2 : p1;
  };
  // t.t[4] = "X";
  // t.t[2] = "O";
  view.displayBoard(t);

  return { t, currentPlayer };
  // inputMove;

  // checkValidMove;

  // checkWinner;

  // checkEndGame;
})(model, view);
