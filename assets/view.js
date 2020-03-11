const view = (() => {
  const displayBoard = (board) => {
    const boxes = Array.from(document.getElementsByClassName('box'));
    boxes.forEach((box, i) => {
      box.innerHTML = board.t[i];
    });
  };

  const showPlayerNames = (p1, p2) => {
    document
      .getElementById('player1')
      .setAttribute('placeholder', p1.getName());
    document
      .getElementById('player2')
      .setAttribute('placeholder', p2.getName());
  };

  const showWinningComb = (row) => {
    row.forEach((box) => {
      document.getElementById(box).style.color = '#f00';
    });
  };

  const showModal = (msg) => {
    const m = document.getElementsByClassName('modal-popup');
    m[0].style.display = 'grid';
    document.getElementById('message').innerHTML = msg;
  };

  const closeModal = () => {
    const m = document.getElementsByClassName('modal-popup');
    m[0].style.display = 'none';
  };

  const resetColors = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 9; i++) {
      document.getElementById(i).style.color = 'var(--letter)';
    }
  };

  return {
    displayBoard,
    showPlayerNames,
    showModal,
    closeModal,
    showWinningComb,
    resetColors,
  };
})();

export default view;