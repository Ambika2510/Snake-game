//Game constants and variables
let inputdir = {
    x: 0,
    y: 0
};
alert("Use arrow up/down/left/right key to play the game for PC otherwise use key on screen to play");
let foodsound = new Audio('food.mp3');
let gameoversound = new Audio('gameover.mp3');
let movesound = new Audio('move.mp3');
let music = new Audio('music.mp3');
let snakearr = [
    { x: 13, y: 15 }
]
let score = 0;
let hs = 0;
if (localStorage.length > 0) {
    let ht = JSON.parse(localStorage.getItem("hs"));
    hs = ht;
    let HiScore = document.getElementById('HiScore');
    HiScore.innerHTML = "HiScore: " + hs
}
let food = {
    x: 13,
    y: 14
};
let speed = 4;
let lastpainttime = 0;
// Game Function
// function main(ctime) {
//     window.requestAnimationFrame(main);

//     if ((ctime - lastpainttime) / 1000 < 1 / speed) {
//         return;
//     }

//     lastpainttime = ctime;
//     getengine();

// }
function fun() {
    getengine();
    console.log("vfg");
}

function iscollision(snake) {
    //qIf you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump with border
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;

}

function getengine() {
    if (iscollision(snakearr)) {
        gameoversound.play();
        movesound.pause();
        inputdir = { x: 0, y: 0 }
        alert("game over and press enter and Use arrow up/down/left/right key to play the game for PC otherwise use key on screen to play");
        snakearr = [
            { x: 13, y: 15 }
        ];
        let HiScore = document.getElementById('HiScore');
        if (hs <= score) {
              localStorage.removeItem("hs");
            localStorage.setItem("hs", JSON.stringify(score));
            hs = score;
            HiScore.innerHTML = "HiScore: " + hs;
        }
        score = 0;
        val.value = 0;
    }
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {

        foodsound.play();
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        ++score;
        let Scorebox = document.getElementById("scorebox");
        Scorebox.innerHTML = "Score: " + score;

        // let hs = document.getElementById('hs');
        // if (hs.value <= score) {
        //     hs.value = score;
        // }
    }
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = {...snakearr[i] };
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;



    let board = document.getElementById("board");
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) snakeElement.className = 'head';
        else snakeElement.className = 'body';
        board.appendChild(snakeElement);

    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.className = 'food';
    board.appendChild(foodElement);


}
//Main logic start here
// window.requestAnimationFrame(main);
setInterval(fun, 120);
window.addEventListener('keydown', e => {
        // inputdir = {
        //     x: 0,
        //     y: 1
        // }
        movesound.play();
        if (e.key === 'ArrowUp' && inputdir.y !== 1) {
            inputdir.x = 0;
            inputdir.y = -1;
        } else if (e.key === 'ArrowDown' && inputdir.y !== -1) {
            inputdir.x = 0;
            inputdir.y = 1;

        } else if (e.key === 'ArrowLeft' && inputdir.x !== 1) {

            inputdir.x = -1;
            inputdir.y = 0;

        } else if (e.key === 'ArrowRight' && inputdir.x !== -1) {
            inputdir.x = 1;
            inputdir.y = 0;

        }


    })
    // using key on screen
    // let up=document.getElementById('Up');
    // let down=document.getElementById('Down');
    // let left=document.getElementById('light');
    // let right=document.getElementById('right');
function fup() {
    movesound.play();
    if (inputdir.y !== 1) {
        inputdir.x = 0;
        inputdir.y = -1;
    }
}

function fdn() {
    movesound.play();
    if (inputdir.y !== -1) {
        inputdir.x = 0;
        inputdir.y = 1;
    }
}

function flt() {
    movesound.play();
    if (inputdir.x !== 1) {
        inputdir.x = -1;
        inputdir.y = 0;
    }
}

function frt() {
    movesound.play();
    if (inputdir.x !== -1) {
        inputdir.x = 1;
        inputdir.y = 0;
    }
}
