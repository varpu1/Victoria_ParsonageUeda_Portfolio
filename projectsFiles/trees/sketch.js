/**
 * Yourfirstand Lastname
 * IGME-102: Assignment Name, m/d/19
 * Summarization of sketch activity
 */

"use strict"; //catch some common coding errors

let baseBranch;

/**
 * setup :
 */
function setup() {
    createCanvas(800, 800);
    strokeCap(SQUARE);
    //cantor(10, 10, width - 20);
    angleMode(DEGREES);
    // strokeWeight(5);

    let root = createVector(width / 2, height - 50);

    baseBranch = new Branch(root, -90, 100);

    baseBranch.display();

    // topline = new CLine(root, width - 20);

}

function draw() {
    // background("black");

    //  topline.display();
    /*if (mouseIsPressed == true) {
        topline.triggerSplit();
    }*/
}

function cantor(x, y, len) {


    /*if (len >= 1) { // Stop at 1 pixel!
        line(x, y, x + len, y);
        y += 10;
        cantor(x, y, len / 3); // recurse!
        cantor(x + len * 2 / 3, y, len / 3); // recurse!
    }*/

}
