const model = (() => {
  const Table = () => {
    const t = [null, null, null, null, null, null, null, null, null];
    return { t };
  };

  const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
  };
  return { Table, Player };
})();

const view = (() => {
  const putSymbol = board => {
    let mark = controller.currentPlayer.getMarker();
    board.t[i] = mark;
  };
  const displayBoard = board => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.innerHTML = board.t[i];
      if (box.innerHTML == "") {
        box.addEventListener("click", putSymbol(board));
      }
    });
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    count = 0;
    gamestop = false;
    displayBoard();
    return board;
  };

  resetBoard();
  inputPlayers = () => {};
  winnerCelebration = () => {};
  return { displayBoard };
})();

const controller = (() => {
  let t = model.Table(),
    p1 = model.Player("Name1", "X"),
    p2 = model.Player("Anonymous", "0"),
    currentPlayer = p1;

  const playerTurns = marker => {
    if (curentPlayer % 2 === 0) {
      currentPlayer = p2;
    }
    currentPlayer = p1
  }
  playerTurns('X');
  // t.t[4] = "X";
  // t.t[2] = "O";
  view.displayBoard(t);

  return { t, currentPlayer };
  // inputMove;

  // checkValidMove;

  // checkWinner;

  // checkEndGame;
  const checkEndGame = () => {
    if ()
  }
})();
