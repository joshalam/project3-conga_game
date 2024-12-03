
// Variables

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var player = new Image();
var npc = new Image();
var npc2 = new Image()
player.src = "images/Player (3).png";
npc.src = "images/Player (5).png";
var xPlayer = 0;
var yPlayer = 0;  
var yNPC= 0, xNPC= 0;
var bw = 512;
var bh = 512;
var p = 0;
var animation = 0;
var directionX = 32;
var directionY = 0;
let congaLine = [];
var score = 0;
let gameEnd = false;
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
let highScore = localStorage.getItem("high-score") || 0;

//Functions 


function chooseColour() {
    var color = Math.floor(Math.random() * 7);
    if (color == 0) {
        ctx.fillStyle = "#ff4a4a";
    }
    if (color == 1) {
        ctx.fillStyle = "#ff5c00";
    }
    if (color == 2) {
        ctx.fillStyle = "yellow";
    }
    if (color == 3) {
        ctx.fillStyle = "#36ff39";
    }
    if (color == 4) {
        ctx.fillStyle = "#45fff4";
    }
    if (color == 5) {
        ctx.fillStyle = "#740eb9";
    }
    if (color == 6) {
        ctx.fillStyle = "#fb00ff";
    }
}



function keepScore() {
    score += 10; 
    document.getElementById("#score").textContent = `Score : ${score}`;
}

function animate() {
   if (animation == 0) {
    animation = 1;
    player.src = "images/Player (3).png";
    npc.src = "images/Player (5).png"
   } else if (animation == 1) {
    animation = 0;
    player.src = "images/Player (4).png";
    npc.src = "images/Player (7).png"
   }
}

function spawnNPC() {
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max- min)+ min);
    }
    xNPC = (getRandomInteger(1, 16) * 32);
    yNPC = (getRandomInteger(1, 16) * 32);
    console.log(xNPC);
        console.log(yNPC);
    
    }

function Draw() {
    chooseColour();
    ctx.clearRect(0, 0, 512, 512)
    ctx.fillRect(0,0, 512,512);
    drawBoard();
    animate();
    
    xPlayer = xPlayer + directionX;
    yPlayer = yPlayer + directionY;
    
    ctx.drawImage(npc, xNPC, yNPC); 
    for (let i = 0; i < congaLine.length; i++) {
        ctx.drawImage(player, congaLine[i][0], congaLine[i][1]); 
        if (i !== 0 && congaLine[0][1] === congaLine[i][1] && congaLine[0][0] === congaLine[i][0]){
            gameEnd = true;
        }
    }
    
}


function drawBoard() {
    for (var x = 0; x <= bw; x += 32) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += 32) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
}

const setDirection = (e) => {
    if (e.key === "ArrowUp" && directionY != 32 ) {
        directionX = 0;
        directionY = -32;
    }
    if (e.key === "ArrowDown" && directionY != -32) {
        directionX = 0;
        directionY = 32;
    }
    if (e.key === "ArrowRight" && directionX != -32) {
        directionX = 32;
        directionY = 0;
    }
    if (e.key === "ArrowLeft" && directionX != 32) {
        directionX = -32;
        directionY = 0;
    }
}

function gameOver() {
    const element = document.getElementById("gameMenu")
    element.style.display = "flex";
    clearInterval(setIntervalId);
    
}

function gameplay(){
    if (gameEnd === true){
        gameOver();
    }

    if (xPlayer === xNPC && yPlayer === yNPC) {
        spawnNPC();
        congaLine.push([xNPC, yNPC]);
        score += 10;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore)
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    Draw();
    for (let i = congaLine.length - 1; i > 0; i--) {
        congaLine[i] = congaLine[i - 1];
    }

    congaLine[0] = [xPlayer, yPlayer];


    if (congaLine[0][0] < 0 || congaLine[0][0] > 512 || congaLine[0][1] < 0 || congaLine[0][1] > 512) {
        gameEnd = true;
    }
    
}

window.onkeydown = function() {
    document.getElementById("music").play()
}
setInterval(gameplay, 500);
window.addEventListener("keydown", setDirection);





