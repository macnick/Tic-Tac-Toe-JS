import Player from "./player.js";
import Table from "./board.js";

const view = (() => {
  
  const displayBoard = board => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      box.innerHTML = board.t[i];
    });
  };
  const resetBoard = () => {
    let boxes = Array.from(document.getElementsByClassName("box"));
    boxes.forEach((box, i) => {
      board.t[i] = null;
      box.innerHTML = board.t[i]
    });
  }

  // inputPlayers = () => {};
  // winnerCelebration = () => {};
  return { displayBoard, resetBoard };
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
    alert(currentPlayer);
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
  const checkWinner = () => {
    let winCombination = [
      '00', '01', '02',
      '10', '11', '12',
      '20', '21', '22'
    ];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (winCombination.includes(winCombination[row][col])) {
          // return palyer name wins, congratulations

        }
      }
      
    }

    return { true }
  }

  // checkEndGame;
})(view);
