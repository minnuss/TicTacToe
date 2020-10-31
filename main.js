// let boxes = document.getElementsByClassName('box');
let boxes = document.querySelectorAll('.box');

const playText = document.querySelector('#playText');
const restartBtn = document.querySelector('#restartBtn');
const spaces = [];
const playerOneSign = 'O';
const playerTwoSign = 'X';
let currentPlayer = playerOneSign;

const drawBoard = () => {
    boxes.forEach((box, idx) => {
        let styleString = '';
        // prvi red box-ova
        if (idx < 3) {
            styleString += 'border-bottom: 3px solid var(--purple);';
        }
        // prva kolona levo boxova
        if (idx % 3 === 0) {
            styleString += 'border-right: 3px solid var(--purple);';
        }
        // prva kolona desno boxova
        if (idx % 3 === 2) {
            styleString += 'border-left: 3px solid var(--purple);';
        }
        // poslednji red box-ova
        if (idx > 5) {
            styleString += 'border-top: 3px solid var(--purple);';
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked);
    });
};

const boxClicked = (e) => {
    // console.log('box clicked')
    const id = e.target.id;
    console.log(id);
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon()) {
            playText.innerText = `${currentPlayer} has won !`;
            return
        }
        currentPlayer = currentPlayer === playerOneSign ? playerTwoSign : playerOneSign;
    }
}

const playerHasWon = () => {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} has won on top`)
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} has won on the left`)
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} has won diagonally`)
            return true;
        }
    }
    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on right`)
            return true;
        }
        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} has won on the bottom`)
            return true;
        }
    }

    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on middle`)
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on middle`)
            return true;
        }
    }
}

const restart = () => {
    spaces.forEach((space, idx) => {
        spaces[idx] = null;
    })
    boxes.forEach(box => {
        box.innerText = '';
    })
    playText.innerText = `Let's play!`;
    currentPlayer = playerOneSign;
}

restartBtn.addEventListener('click', restart)

restart();
drawBoard();