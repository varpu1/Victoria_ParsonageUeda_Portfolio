class CLine {
    constructor(location, length) {
        this.loc = location;
        this.length = length;

        this.kids = [];
        // this.split();
    }

    split() {
        // make kids if length >= 1
        if (this.length >= 1) {
            let newLoc1 = createVector(0, 10);
            newLoc1.add(this.loc);
            let newLoc2 = createVector(this.length * 2 / 3, 10);
            newLoc2.add(this.loc);
            //make 2 of CLine & push to kids
            this.kids.push(new CLine(newLoc1, this.length / 3));
            this.kids.push(new CLine(newLoc2, this.length / 3));
        }
    }

    display() {
        stroke("white");
        strokeWeight(5);
        push(); //save orig coord system
        // draw line at loc
        translate(this.loc);
        line(0, 0, this.length, 0);
        pop(); //restore orig coord system

        //call display for kids
        this.kids.forEach((kid) => {
            kid.display();
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
