import p5 from "p5";
import { hexagon, hexagonLine, squareLine } from './helper.js'
import dat from "dat.gui";
import Stats from "stats-js";

// ================================
// START YOUR APP HERE
// ================================
// plug in Stats;
// var stats = new Stats();
// stats.setMode(0);
// document.body.appendChild(stats.domElement);

// // plug in dat.GUI
// window.onload = function () {
//     var gui = new dat.GUI();
//     var foo = {
//         bar: "Hello World!"
//     };
//     gui.add(foo, "bar", 10, 1000);
// };

// -----------------------------

const sketch = p5 => {
    // Variables scoped within p5
    const canvasWidth = p5.windowWidth;
    const canvasHeight = p5.windowHeight;

    // make library globally available
    window.p5 = p5;

    //Sketch Variables
    const MARGIN = 100;
    let PALLETTE = []
    let selectedMonth = [];
    let mm = [];
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    // Setup function
    // ======================================
    p5.setup = () => {
        let canvas = p5.createCanvas(canvasWidth, canvasHeight);
        p5.noLoop()
        p5.angleMode(p5.DEGREE);
        p5.rectMode(p5.CENTER);
        PALLETTE = [
            p5.color(217, 241, 46),
            p5.color(255, 255, 255)
        ]
    };

    // Draw function
    // ======================================
    p5.draw = () => {
        p5.background(255);
        timeline();
        let yearPos = p5.floor((canvasWidth - MARGIN) / 11);
        for (let i = 0; i < 12; i++) {
            const isMonth = randomSelectTwo() ? 1 : 0
            mm.push(new Months(yearPos * i, canvasHeight / 2, month[i]))

            if (isMonth) {
                mm[i].display()
                selectedMonth.push(new Months(yearPos * i, canvasHeight / 2, month[i]))

            } else {
                p5.push();
                p5.fill(100, 0, 0);
                mm[i].display()
                p5.pop();
            }
        }
    }

    //TIMELINE
    function timeline() {
        p5.push();
        p5.noFill()
        p5.stroke(PALLETTE[0])
        p5.strokeWeight(1)
        p5.line(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);
        p5.pop();
    }

    p5.mouseClicked = () => {
        for (let i = 0; i < selectedMonth.length; i++) {
            selectedMonth[i].clicked(100);
        }
    }

    class Months {
        constructor(x, y, monthName) {
            this.x = x;
            this.y = y;
            this.monthName = monthName;
            this.display = function () {
                p5.push();
                //p5.fill(255, 0, 0);
                p5.noStroke();
                p5.ellipse(this.x, this.y, 10, 10);
                p5.text(this.monthName, this.x, 80);
                p5.pop();
                this.update(0)
            }
            this.move = function () { }
            this.update = function (a) {
                console.log('UPDATE');
                console.log('A', a, 'X', this.x, 'Y', this.y);
                p5.push();
                this.x = this.x + 100;
                this.y = this.y + 100;
                console.log('X=', this.x, 'Y=', this.y);
                p5.fill(0, 255, 0);
                p5.pop();
            }
            this.clicked = function (a) {
                let d = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y);
                if (d < 20) {
                    this.update(a)
                }
            }
        }
    }

    //Helper Random 1 or 2 for Spoke count
    function randomSelectTwo() {
        const rando = p5.random(1)
        if (rando > 0.5) {
            return true
        } else {
            return false
        }
    }

    //Helper Random Color
    function getRandomFromPallate() {
        const rando2 = p5.floor(p5.random(0, PALLETTE.length))
        return PALLETTE[rando2]
    }

};
new p5(sketch);

export default sketch;

// ================================
// END YOUR APP HERE
// ================================

