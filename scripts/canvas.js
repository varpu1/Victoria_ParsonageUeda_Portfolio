'use strict';
let ctx;
let canvas;
let orbs = [];
let upper = document.querySelector('#upper')

// window.onload = init;
init();


function init() {
    canvas = document.querySelector('#bubbles');
    ctx = canvas.getContext('2d');
    updateCanvas();
    setInterval(() => {
        spawn({ clientX: random(100, canvas.width - 200), clientY: random(100, canvas.height - 200) })
    }, 30000);
    for (let c = 0; c < 7; c++) {
        let orb
        c != 0 ? orb = new Orb(ctx, random(100, canvas.width - 200), random(100, canvas.height - 200), random(20, 50)) : orb = new Orb(ctx, canvas.width * 0.75, canvas.height * 0.15, 70, true);
        orbs.push(orb);
    }
    loop();
}



function loop() {
    setTimeout(loop, 42);
    updateCanvas();
    ctx.fillStyle = '#7b8485';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);


    for (let ob in orbs) {
        let o = orbs[ob];
        o.move(canvas.width, canvas.height);

    }
    for (let oi = 0; oi < orbs.length; oi++) {
        if (orbs[oi].pop == true) {
            orbs.splice(oi, 1)
        }
    }
}
window.onclick = spawn;

function spawn(e) {
    // let rect = e.target.getBoundingClientRect();
    let mouseX, mouseY;
    // if (!r) {
    mouseX = e.clientX //- rect.x;
    mouseY = e.clientY //- rect.y;
        // } else {
        //     mouseX = random(100, canvas.width - 200)
        //     mouseY = random(100, canvas.height - 200)
        // }
    if (mouseX < canvas.width - 55 && mouseY < canvas.height - 55 && mouseX > 55 && mouseY > 55) {
        let orb = new Orb(ctx, mouseX, mouseY, random(20, 50));
        orbs.push(orb);

    }
}


function bang(parent, p) {
    let orb = new Orb(ctx, parent.x + (random(-12, 13) * random(4, 12)),
        parent.y - (random(-12, 13) * random(4, 12)), parent.rad / 2);
    orb.color = 85;
    orb.bri = 43.2;
    orb.xs *= 4;
    orb.ys *= 4;
    let index = orbs.length;
    orbs.push(orb);
    if (orb.rad < 1.5) {
        orbs.splice(1, index);
    }
}
window.onresize = updateCanvas;

function updateCanvas() {

    canvas.width = window.innerWidth - 10
    canvas.height = window.innerHeight
}

function random(min, max) {
    let output = Math.floor(Math.random() * (min, max) + min)
    return output;
}


function drawGradientCircle(ctx, x, y, radius, strokeColor) {
    ctx.save();

    let strokeGrad = ctx.createLinearGradient(x, y + radius * 2, x + radius * 2, y);
    strokeGrad.addColorStop("0", `hsla(${strokeColor},100%,65%,.9)`);
    strokeGrad.addColorStop("1.0", `hsla(${(strokeColor+70)%360},100%,65%,.9)`);

    let grd = ctx.createRadialGradient(x, y, (radius / 5) * 2, x, y, radius);
    grd.addColorStop(0, document.body.getAttribute("theme") == "dark" ? "#03252F40" : "#b8f1ea40 ");
    // grd.addColorStop(0, "#00000000");
    grd.addColorStop(1, "#40b5c480")

    // grd.addColorStop(1, strokeGrad);

    ctx.fillStyle = grd;
    ctx.lineWidth = 4.5;
    ctx.strokeStyle = strokeGrad

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.shadowColor = strokeGrad;
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

function drawCircle(ctx, x, y, radius) {
    ctx.save();
    document.body.getAttribute("theme") == "dark" ? ctx.fillStyle = '#b8f1eabf' : ctx.fillStyle = '#03252FBF'
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    // ctx.shadowColor = 'pink';
    // ctx.shadowBlur = glowVal;
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    if (document.body.getAttribute("theme") == "dark") {
        return "dark"
    } else {
        return "light";
    }
}