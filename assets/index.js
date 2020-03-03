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
  const displayBoard = () => {};
  inputPlayers = () => {};
  winnerCelebration = () => {};
})();

const controller = ((model, view) => {
  let t = model.Table(),
    p1 = model.Player("Name1", "X"),
    p2 = model.Player("Anonymous", "0");

  return { t, p1, p2 };
  // inputMove;

  // checkValidMove;

  // checkWinner;

  // checkEndGame;
})(model, view);
