const board = [];
const player1 = "X";
const player2 = "O";
var player1Score = 0;
var player2Score = 0;
var currPlayer = player1;
const winner = document.getElementById("winner");
const boxes = document.querySelectorAll(".box");
const score = document.getElementsByClassName("score");

const gotClicked = (event) => {
    const clickedId = event.target.id; 
    
    if (!board[clickedId]) {
        const clickedBox = document.getElementById(clickedId);
        clickedBox.innerHTML = currPlayer;
        if (currPlayer === "X") {
            clickedBox.style.color = "#3A413A";
        } else {
            clickedBox.style.color = "white";
        }
        clickedBox.style.fontSize = "5rem";
        board[clickedId] = clickedBox.innerHTML;
    }    
    
    if (playerWon()) {
        restart();
        return;
    }
    
    if (isDraw()) {
        restart();
        winner.innerHTML = "Match is DRAWN";
    }
    
    currPlayer = currPlayer === player1 ? player2 : player1;
};

const restart = () => {
    setTimeout(() => {
        board.length = 0;
        for (let y = 1; y <= 9; y++) {
            var selectedBox = document.getElementById(y);
            selectedBox.innerHTML = '';
        }
        winner.innerHTML = '';
    }, 2000);
}

const reset = () => {
    board.length = 0;
    for (let y = 1; y <= 9; y++) {
        var selectedBox = document.getElementById(y);
        selectedBox.innerHTML = '';
    }
    winner.innerHTML = '';
    updateScores("zero");
}

const isDraw = () => {
    let draw = 0;
    board.forEach((sign, i) => {
        if (sign[i] !== null) {
            draw += 1;
        }
    });
    
    if (draw === 9) {        
        return true;
    }
    return false;
}

const doAnimations = (first, second, third) => {
    boxes.forEach((box, i) => {
        if (i === first || i === second || i === third) {
            box.style.cssText += "opacity: 0.3; font-size: 6rem";
        }
    });
    setTimeout(() => {
      boxes.forEach((box, i) => {
        if (i === first || i === second || i === third)  box.style.cssText += "opacity: 1; font-size: 5rem";
      });
    }, 2500);
}

const updateScores = (val) => {
    if (val === "zero") {
        player1Score = 0;
        player2Score = 0;
        score[1].innerHTML = player2Score;
        score[0].innerHTML = player1Score;
        return;
    }
    
    if (currPlayer === "X") {
      player1Score += 1;
      score[0].innerHTML = player1Score;
    } else {
      player2Score += 1;
      score[1].innerHTML = player2Score;
    }
}

const playerWon = () => {
    if (board[1] === currPlayer) {
        if (board[4] === currPlayer && board[7] === currPlayer) {
            doAnimations(0, 3, 6);            
            winner.innerHTML = `${currPlayer} won by matching LEFT COLUMN`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
        if (board[2] === currPlayer && board[3] === currPlayer) {
            doAnimations(0, 1, 2);
            winner.innerHTML = `${currPlayer} won by matching TOP ROW`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
        if (board[5] === currPlayer && board[9] === currPlayer) {
            doAnimations(0, 4, 8);
            winner.innerHTML = `${currPlayer} won by matching Main DIAGONAL`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
    }
    
    if (board[9] === currPlayer) {
        if (board[7] === currPlayer && board[8] === currPlayer) {
            doAnimations(8,6,7)
            winner.innerHTML = `${currPlayer} won by matching BOTTOM ROW`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
        if (board[3] === currPlayer && board[6] === currPlayer) {
            doAnimations(8, 2, 5);
            winner.innerHTML = `${currPlayer} won by matching RIGHT COLUMN`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
    }
    
    if (board[5] === currPlayer) {
        if (board[4] === currPlayer && board[6] === currPlayer) {
            doAnimations(4, 3, 5);
            winner.innerHTML = `${currPlayer} won by matching MIDDLE ROW`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
        if (board[2] === currPlayer && board[8] === currPlayer) {
            doAnimations(4, 1, 7);
            winner.innerHTML = `${currPlayer} won by matching MIDDLE COLUMN`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
        if (board[7] === currPlayer && board[3] === currPlayer) {
            doAnimations(4, 6, 2);
            winner.innerHTML = `${currPlayer} won by matching SECOND DIAGONAL`;
            winner.style.color = "green";
            updateScores();
            return true;
        }
    }
}

const drawBoard = () => {
    for (let i = 1; i <= 9; i++) {
        var boxNum = i;
        var box = document.getElementById(boxNum);
        let styling = "";
        let color = "#17271C;";
        
        if (i % 3 == 0) {
            styling += `border-left: 3px solid ${color}`
        }
        if (i % 3 == 1) {
            styling += `border-right: 3px solid ${color}`
        }
        if (i < 4) {
            styling += `border-bottom: 3px solid ${color}`
        }
        if (i > 6) {
            styling += `border-top: 3px solid ${color}`
        }
        
        box.style = styling;
        box.addEventListener("click", gotClicked);
    }
}

drawBoard();


