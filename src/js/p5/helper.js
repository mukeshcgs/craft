// Hexagone Line
export function hexagonLine(posX, posY, radius) {
    const rotAngle = p5.TWO_PI / 6
    p5.beginShape();
    for (let i = 0; i < 2; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
        p5.vertex(thisVertex.x, thisVertex.y)
    }
    p5.endShape(p5.CLOSE)
}

// Square Line
export function squareLine(posX, posY, radius) {
    const rotAngle = p5.TWO_PI / 4
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
        p5.vertex(thisVertex.x, thisVertex.y)
    }
    p5.endShape(p5.CLOSE)
}

// Hexagone
function hexagon(posX, posY, radius) {
    const rotAngle = p5.TWO_PI / 6
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
        p5.vertex(thisVertex.x, thisVertex.y)
    }
    p5.endShape(p5.CLOSE)
}

//Helper Point on Circle
function pointOnCircle(posX, posY, radius, angle) {
    const x = posX + radius * p5.cos(angle)
    const y = posY + radius * p5.sin(angle)
    return p5.createVector(x, y)
}
