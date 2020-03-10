import Player from './player.js';
import Table from './board.js';

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

// self-contained module
const controller = ((view) => {
  let t = Table();
  let p1;
  let p2;
  let currentPlayer = p1;
  let game = false;

  const getNames = () => {
    let player1 = document.getElementById('player1');
    let player2 = document.getElementById('player2');
    player1.value === '' ? (player1 = 'X') : (player1 = player1.value);
    player2.value === '' ? (player2 = 'O') : (player2 = player2.value);
    return [player1, player2];
  };

  const addListeners = (t) => {
    const boxes = Array.from(document.getElementsByClassName('box'));
    boxes.forEach((box, i) => {
      box.addEventListener('click', putSymbol);
    });
    document.getElementById('reset').addEventListener('click', resetBoard);
    document.getElementById('modal').addEventListener('click', view.closeModal);
  };

  const highlightPlayer = () => {
    if (currentPlayer === p1) {
      document
        .getElementById('player1')
        .style.setProperty('color', 'var(--box)');
      document
        .getElementById('player2')
        .style.setProperty('color', 'var(--letter)');
    } else {
      document
        .getElementById('player1')
        .style.setProperty('color', 'var(--letter)');
      document
        .getElementById('player2')
        .style.setProperty('color', 'var(--box)');
    }
  };

  const putSymbol = (e) => {
    if (e.target.innerHTML === '' && game) {
      t.t[e.target.id] = currentPlayer.getMarker();
      // here we check if we have a winning move. Currently just console.log the name
      view.displayBoard(t);
      if (checkWinner(t.t)) {
        const msg = `Winner is ${currentPlayer.getName()}!`;
        view.showModal(msg);
        game = false;
      } else if (isItATie()) {
        const msg = 'It is a tie!';
        view.showModal(msg);
      }
      // change player
      currentPlayer = currentPlayer === p1 ? p2 : p1;
      highlightPlayer();
    }
  };

  const isItATie = () => t.t.every((pos) => pos != null);

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    let winner = false;
    winConditions.forEach((row) => {
      if (
        board[row[0]] === board[row[1]]
        && board[row[1]] === board[row[2]]
        && (board[row[0]] === 'X' || board[row[0]] === 'O')
      ) {
        winner = true;
        view.showWinningComb(row);
      }
    });
    return winner;
  };

  const resetBoard = () => {
    t = Table();
    p1 = Player(getNames()[0], 'X');
    p2 = Player(getNames()[1], 'O');
    currentPlayer = p1;
    view.showPlayerNames(p1, p2);
    highlightPlayer();
    view.displayBoard(t);
    view.resetColors();
    game = true;
  };

  addListeners(t);
  view.displayBoard(t);

  return { t, currentPlayer, resetBoard };
})(view);
