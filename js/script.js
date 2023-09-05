

// Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const directionSound = new Audio('direction.mp3');
const backgroundSound = new Audio('background.mp3');
let speed = 5;
let score = 0;
let lastPainTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPainTime) / 1000 < 1 / speed) {
        return;
    }
    lastPainTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // if snake collides with itself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOverSound.play();
            return true;
        }
    }
    // if snake collide with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
           return true;
    }

}

function gameEngine() {
    // Part 1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        backgroundSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        backgroundSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = " Score: " + score;
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    let newHead = { x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y };
    snakeArr.unshift(newHead);

    // Part 2: Display the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Remove the last segment of the snake to keep its length constant
    if (snakeArr.length > score + 1) {
        snakeArr.pop();
    }

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic  starts here

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 }; // Start the game
    directionSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});
