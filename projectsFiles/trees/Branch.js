class Branch {

    constructor(location, angle, length) {
        this.loc = location;
        this.length = length + random(-length * .1, length * .1);
        this.angle = angle;
        //Temporary working starting point:
        //starts at (0,0), 0 angle, but right length

        this.tip = createVector(this.length, 0);
        //TODO: still need to figure out 
        this.tip.rotate(this.angle)
            //give tip correct start point
        this.tip.add(this.loc);
        this.kids = [];
        this.split();
    }

    split() {
        // make kids if length >= 1
        if (this.length >= 16) {
            //calc kid angles
            // console.log(this.length);
            let branchAngle = random(50, 100);
            //let lean = random(-15, 15);
            let angle1 = this.angle - branchAngle / 2;
            let angle2 = this.angle + branchAngle / 2;

            //make 2 of CLine & push to kids
            this.kids.push(new Branch(this.tip, angle1, this.length * .8));
            this.kids.push(new Branch(this.tip, angle2, this.length * .8));
        }
    }
    flower() {
        strokeCap(ROUND)
        line

        noStroke();
        //stroke("pink");
        fill("pink");
        ellipse(this.tip.x, this.tip.y, 6, 11)
        ellipse(this.tip.x + 5, this.tip.y + 5, 11, 5)
        ellipse(this.tip.x, this.tip.y + 10, 6, 11)
        ellipse(this.tip.x - 5, this.tip.y + 5, 11, 6)
            //stroke("yellow");
        fill("yellow");
        ellipse(this.tip.x, this.tip.y + 5, 4, 4);
        strokeCap(SQUARE)
    }
    display() {
        stroke(49, 37, 16);
        strokeWeight(4);
        push(); //save orig coord system
        // draw line at loc
        translate(this.loc);

        rotate(this.angle);

        line(0, 0, this.length, 0);
        pop(); //restore orig coord system

        //call display for kids
        this.kids.forEach((kid) => {
            if (this.length < 25) {
                kid.display();
                kid.flower();
            } else {
                kid.display();
            }

        });
    }


    triggerSplit() {

        let d = dist(this.loc.x, this.loc.y, mouseX, mouseY);

        if (this.kids.length == 0) {
            if (d <= 10) {
                this.split();
            }
        } else {
            this.kids.forEach((kid) => {
                kid.triggerSplit();
            });
        }
    }
}