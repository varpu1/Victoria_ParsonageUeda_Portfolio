/**
 * Victoria Ueda
 * IGME-102: Birthday, 1/30/2019
 * has a cuckoo birs going in and out and when you press on mouse the word cuckoo will change color
 */

"use strict"; //catch some common coding errors
//Global Variables
let richelaKid;
let bird;
let xSpeed = 1;
let ySpeed = -1;
let x = 100;
let y = 340;
let c = 338.11;
let w = 100;
let i = 1;
/**
 * setup : Initialization runs once; called automatically
 * Summarize code that you add
 */

function preload() {
    richelaKid = loadFont("media/RichelaKidsFont.otf")
    bird = loadImage("media/cuckoo_bird.png");
}



function setup() {
    createCanvas(500, 500);
    colorMode(HSB);

    textFont(richelaKid, 90);

    let a = [];

    if (a === true) {
        print(a, "is", true)
    } else {
        print(a, "is", false)
    }
}


/**
 * draw : Periodically called automatically
 * Summarize code that you add
 */
function draw() {
    // translate(50, 445);
    background("lightBlue");


    //clock
    stroke(0, 0, 0);
    strokeWeight(2);
    fill("brown");
    rect(10, 375, 80, 110);
    triangle(10, 375, 50, 330, 90, 375);
    fill("black");
    rect(40, 390, 20, 20);
    fill("white");
    ellipse(50, 445, 50, 50);
    line(50, 445, 50, 425);
    line(50, 445, 65, 445);



    fill(338.11, 91.37, 100);
    if (mouseIsPressed && c === 338.11) {
        fill(253.45, 68.24, 100)
        c = 253.45;
    } else if (mouseIsPressed && c === 253.45) {
        fill(338.11, 91.37, 100)
        c = 338.11;
    }

    text('C', (width / 2) - 190, 90);
    text('u', (width / 2) - 120, 110);
    text('c', (width / 2) - 50, 90);
    text('k', (width / 2) + 20, 75);
    text('o', (width / 2) + 90, 110);
    text('o', (width / 2) + 160, 90);




    // image(bird, x, y, 100, 100);

    //ellipse(x, y, 20, 20);
    // move the ball
    x = x + xSpeed;
    y = y + ySpeed;

    //bounceX
    if (x > (270)) {
        xSpeed = -1;
    }
    if (100 > x) {
        xSpeed = 1;
    }
    //bounceY
    if (y > (340)) {
        ySpeed = -1;
    }
    if (170 > y) {
        ySpeed = 1;
    }

    w = w + (xSpeed * .85);

    line(50, 400, x + (w / 2) - 25, y + w - 17)

    image(bird, x, y, w, w);



}
