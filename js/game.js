// canvas settings
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// game objects
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
let fly = new Audio();
let srcAudio = new Audio();

// object's source
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeNorth.png";
pipeBottom.src = "img/pipeSouth.png";
fly.src = "audio/fly.mp3";
srcAudio.src = "audio/score.mp3";


let gap = 90;

// game control
document.addEventListener("keydown", moveUp);
function moveUp() {
    yPos -= 25;
    fly.play();
}

// pipe generation
let pipe = [];


// TODO: memory cleaner
pipe[0] = {
    x : cvs.width,
    y : 0
}

// score counter
let score = 0;

// bird position
let xPos = 10;
let yPos = 150;
let grav = 1.5;

// TODO: start menu

function render() {
    ctx.drawImage(bg, 0, 0);

    // main game loop
    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x === 100) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // collision tracking
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }

        // score tracking
        if(pipe[i].x === 5) {
            score++;
            srcAudio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    // score output
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(render);
}

pipeBottom.onload = render();