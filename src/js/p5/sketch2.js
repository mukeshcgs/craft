import React, { Component } from 'react';
import PropTypes from 'prop-types';
import p5 from "p5";
import { hexagon, hexagonLine, squareLine } from './helper.js'
import dat from "dat.gui";
import Stats from "stats-js";

class Sketch2 extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    Sketch = (p5) => {

        // Variables scoped within p5
        const WIDTH = p5.windowWidth;
        const HEIGHT = p5.windowHeight;

        // make library globally available
        window.p5 = p5;

        //Sketch Variables
        const MARGIN = 100;
        let PALLETTE = []
        let selectedMonth = [];
        let mm = [];
        const MONTH = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        // Setup function
        // ======================================
        p5.setup = () => {
            let canvas = p5.createCanvas(WIDTH, HEIGHT);
            p5.noLoop()
            p5.angleMode(p5.DEGREE);
            p5.rectMode(p5.CENTER);
            PALLETTE = [
                p5.color(217, 241, 46),
                p5.color(255, 255, 255),
                p5.color(0, 130, 255),
            ]
        };

        // Draw function
        // ======================================
        p5.draw = () => {
            p5.background(0);
            timeline();
            let yearPos = p5.floor((WIDTH - MARGIN) / 11);
            for (let i = 0; i < 12; i++) {
                const isMonth = randomSelectTwo() ? 1 : 0
                mm.push(new Months(yearPos * i, HEIGHT / 2, MONTH[i]))

                if (isMonth) {
                    p5.push();
                    p5.fill(255, 0);
                    p5.noStroke();
                    p5.pop();
                    mm[i].display()
                    selectedMonth.push(new Months(yearPos * i, HEIGHT / 2, MONTH[i]))

                } else {
                    p5.push();
                    p5.fill(0, 255, 0);
                    mm[i].display()
                    p5.pop();
                }
            }
        }

        //TIMELINE
        function timeline() {
            p5.push();
            p5.noFill()
            p5.stroke(PALLETTE[2])
            p5.strokeWeight(1)
            p5.line(0, HEIGHT / 2, WIDTH, HEIGHT / 2);
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
                    p5.ellipse(this.x, this.y, 10, 10);
                    p5.fill(255, 0, 0);
                    p5.text(this.monthName, this.x, this.y - 20);
                    p5.rotate(90);
                    p5.pop();

                    this.update(0)
                }
                this.move = function () { }

                this.update = function (a) {
                    console.log('UPDATE');
                    // console.log('A', a, 'X', this.x, 'Y', this.y);
                    // p5.push();
                    // this.x = this.x + 100;
                    // this.y = this.y + 100;
                    // // console.log('X=', this.x, 'Y=', this.y);
                    // p5.fill(0, 0, 255);
                    // p5.pop();
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

    }

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        return (
            <div ref={this.myRef}></div>
        )
    }
}
export default Sketch2;