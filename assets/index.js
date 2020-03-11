/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import Player from './player.js';
import Table from './board.js';
import view from './view.js';

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
      } else if (checkTie()) {
        const msg = 'It is a tie!';
        view.showModal(msg);
      }
      // change player
      currentPlayer = currentPlayer === p1 ? p2 : p1;
      highlightPlayer();
    }
  };

  const checkTie = () => t.t.every((pos) => pos != null);

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
