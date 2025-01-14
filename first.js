let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
let winMessageContainer = document.querySelector('.messag');
let winMsg = document.querySelector('.winMsg');
let newGameBtn = document.querySelector('.newGame');

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Reset the game
const resetGame = () => {
    turnO = true;
    boxes.forEach(box => {
        box.innerText = ""; // Clear all box text
        box.classList.remove('disabled'); // Enable the box for clicks
    });
    winMessageContainer.classList.add('hide'); // Hide the winner message
};

// Disable all boxes (used when there is a winner)
const disableBoxes = () => {
    boxes.forEach(box => {
        box.classList.add('disabled'); // Disable interaction
    });
};

// Show the winner
const showWinner = (winner) => {
    winMsg.innerText = `Winner is Player ${winner}`;
    winMessageContainer.classList.remove('hide'); // Display the winner message
    disableBoxes(); // Disable all boxes
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        let boxA = boxes[a].innerText;
        let boxB = boxes[b].innerText;
        let boxC = boxes[c].innerText;

        if (boxA !== "" && boxA === boxB && boxB === boxC) {
            showWinner(boxA); // Pass the winner ("X" or "O") to showWinner
            return;
        }
    }

    // Check for a draw
    const isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        winMsg.innerText = "It's a Draw!";
        winMessageContainer.classList.remove('hide'); // Display the draw message
    }
};

// Add click event listeners to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.classList.contains('disabled')) {
            return; // Ignore clicks on already played boxes
        }

        // Mark the box with the current player's symbol
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.classList.add('disabled'); // Disable the clicked box
        checkWinner(); // Check for a winner after every move
    });
});

// Add event listeners for reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);