class Orb {
    constructor(ctx, x, y, radius, txt = false) {
        this.x = x;
        this.y = y;
        this.rad = radius;
        let n = [-2, -1, 1, 2];
        this.xs = n[random(0, 4)]; //x speed&direction
        this.ys = n[random(0, 4)]; //y speed&direction
        this.ctx = ctx;
        this.pop = false;
        this.rest = 25;
        this.randomStartColor = random(0, 360)
        this.txt = txt;

        let time = random(50000, 75000)
        setTimeout(() => {
                this.pop = true;
            }, time)
            // console.log(this.x, this.y)
    }
    move(w, h) {
        if (this.xs > 1) {
            this.xs -= .5
        } else if (this.xs < -1) {
            this.xs += .5
        }

        if (this.ys > 1) {
            this.ys -= .5
        } else if (this.ys < -1) {
            this.ys += .5
        }

        if (this.x < this.rad || this.x > w - this.rad) {
            this.xs *= -1;
        }
        if (this.y < this.rad || this.y > h - this.rad) {
            this.ys *= -1;
        }
        this.x += this.xs;
        this.y += this.ys;

        //draws bubble
        if (this.txt == false) {
            drawGradientCircle(this.ctx, this.x, this.y, this.rad, this.randomStartColor)
        } else {
            let c = drawCircle(this.ctx, this.x, this.y, this.rad)
            c == "dark" ? this.ctx.fillStyle = "#000000" : this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "16px Arial";
            this.ctx.textAlign = "center"
            this.ctx.fillText("click anywhere", this.x, this.y - 15, this.rad * 2);
            this.ctx.fillText("to make more", this.x, this.y + 5, this.rad * 2);
            this.ctx.fillText("BUBBLES", this.x, this.y + 25, this.rad * 2);

        }
    }
    collide() {
        this.xs = 0;
        this.ys = 0;
        this.rest = 25;
    }
}