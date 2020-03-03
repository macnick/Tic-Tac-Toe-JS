const Model = (() => {
  const Table = () => {
    const t = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    return { t };
  };

  const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
  };
  return { Table, Player };
})();

const View = () => {
  displayBoard = () => {};
  inputPlayers = () => {};
  winnerCelebration = () => {};
};

const Controller = () => {
  inputMove;

  checkValidMove;

  checkWinner;

  checkEndGame;
};
