"use strict";

let canvasWidth = window.innerWidth * .94,
    canvasHeight = window.innerHeight * .8;
let ctx;
let n = 0;
const c = 4;
let j = 0;
let color;
let s = canvasHeight - 3;
let mouseX = canvasWidth / 2;
let mouseY = canvasHeight / 2;
let divergence;
let luminosity;
let colorMode;
let angle;
let speed;
let blank;
let glowVal = 7;
let glow;


document.querySelectorAll("input[name='angle']").forEach(function(rad) {
    rad.onclick = function(e) {
        if (e.target.checked) {
            angle = e.target.value;
        }
    }
});

document.querySelectorAll("input[name='color']").forEach(function(col) {
    col.onclick = function(e) {
        if (e.target.checked) {
            colorMode = e.target.value;
        }
    }
});

document.querySelectorAll("#speed").forEach(function(sp) {
    sp.oninput = function(e) {
        speed = e.target.value;
        // console.log(speed);
    }
});




window.onload = init;

function init() {
    angle = document.querySelector("input[name='angle']:checked").value;
    colorMode = document.querySelector("input[name='color']:checked").value;
    luminosity = document.querySelector("#luminosity");
    glow = document.querySelector("#glow");
    speed = document.querySelector("#speed").value;
    divergence = angle;
    blank = document.querySelector("#resetButton");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    luminosity.onclick = lum;
    glow.onclick = glowFun;
    blank.onclick = clear;
    loop();
}


function colorFun() {
    if (colorMode == "rainbow") {
        color = `hsl(${j/4% 361},100%,50%)`;
    } else if (colorMode == "red") {
        color = `hsl(${j/4% 116},100%,50%)`;
    } else if (colorMode == "green") {
        color = `hsl(${(j/4% 116)+115},100%,50%)`;
    } else if (colorMode == "blue") {
        color = `hsl(${(j/4% 116)+230},100%,50%)`;
    }
}



function loop() {
    setTimeout(loop, speed / 30);
    colorFun();

    if (s > mouseY) {
        let b = 1 - (mouseY / s);
        let a = parseFloat(b.toFixed(2));

        drawCircle(ctx, mouseX, s, 2, `hsla(100,100%,100%,${a})`);
        s = s - 10;
    } else {
        let a = n * dtr(angle);
        let r = c * Math.sqrt(n);

        let x = r * Math.cos(a) + mouseX;
        let y = r * Math.sin(a) + mouseY;


        if (gradient.checked == true) {
            drawGradientCircle(ctx, x, y, (n % 5), color);
        } else {
            drawCircle(ctx, x, y, (n % 5), color);
        }
        n++;
        j++;
    }
}

canvas.onclick = newBud;

function newBud(e) {
    clear(.25);
    mouseX = e.clientX;
    mouseY = e.clientY;
}


//Is supposed to account for where the canvas is on the window
// function newBud(ctx, e){
//     n=0;
//     s=canvasHeight-3;
//     let rect = e.target.getBoundingClientRect();
//     let mouseX = e.clientX - rect.x;
//     let mouseY = e.clientY - rect.y;
//     console.log(rect);
// }



// helpers
function dtr(degrees) {
    return degrees * (Math.PI / 180);
}

function lum() {
    if (luminosity.checked == true) {
        ctx.globalCompositeOperation = "luminosity";
    } else {
        ctx.globalCompositeOperation = "source-over";
    }
}

function glowFun() {
    if (glow.checked == true) {
        glowVal = 7;

    } else {
        glowVal = 1;
    }
}


function drawCircle(ctx, x, y, radius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.shadowColor = color;
    ctx.shadowBlur = glowVal;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function clear(ca = 1) {
    n = 0;
    s = canvasHeight - 3;
    ctx.save();
    ctx.fillStyle = `hsla(0,0%,0%,${ca})`;
    ctx.beginPath();
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

function drawGradientCircle(ctx, x, y, radius, color) {
    ctx.save();
    let grd = ctx.createRadialGradient(x, y, radius / 5, x, y, radius);
    grd.addColorStop(0, "white");
    grd.addColorStop(1, color);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.shadowColor = color;
    ctx.shadowBlur = 7;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}