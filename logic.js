// Game Constants
let inputDir = { x: 0, y: 0 }
const aud_food = new Audio('music/food.mp3');
const aud_gameover = new Audio('music/gameover.mp3');
const aud_move = new Audio('music/move.mp3');
const aud_music = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

// Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {

    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    //if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {

    //Updating snake array and food
    if (isCollide(snakeArr)) {
        aud_gameover.play();
        aud_music.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over, Press any key to start over");
        snakeArr = [{ x: 13, y: 15 }];
        aud_music.play();
        score = 0;
    }

    // //If food is eaten, increment score and regenerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        aud_food.play();
        score++;
        if (score>highScoreVal){
            highScoreVal=score;
            localStorage.setItem("highScore",JSON.stringify(highScoreVal));
            highScoreBox.innerHTML= "High Score : " +highScoreVal;
        }
        scoreBox.innerHTML="Your Score : " +score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }

    // // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };//... is for new object creation
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// Main Logic
aud_music.play();
let highScore = localStorage.getItem("highScore");
if (highScore === null)
{
    highScoreVal=0;
    localStorage.setItem("highScore",JSON.stringify(highScoreVal));
}
else
{
    highScoreVal= JSON.parse(highScore);
    highScoreBox.innerHTML= "High Score : " +highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//start the game
    aud_move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown")
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;

        default:
            break;
    }
})