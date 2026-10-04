const r = require("raylib")

function getData(windowWidth, windowHeight) {
    const d1 = {
        x: 0,
        y: 0,
        width: 40,
        height: windowHeight,
        start: 0,
        end: windowWidth / 2,
        overlapStatus: false,
        color: r.WHITE,
        velocity: 3,
        isVertical: false,
    }
    const d2 = {
        x: windowWidth / 2,
        y: 0,
        width: 40,
        height: windowHeight,
        start: windowWidth / 2,
        end: windowWidth,
        overlapStatus: false,
        color: r.WHITE,
        velocity: 4,
        isVertical: false,
    }
    const d3 = {
        x: 0,
        y: 0,
        width: windowWidth,
        height: 40,
        start: 0,
        end: windowHeight,
        overlapStatus: false,
        color: r.WHITE,
        velocity: 5,
        isVertical: true,
    }

    const p1 = {
        x: 30,
        y: 0,
        width: 50,
        height: windowHeight,
        isVertical: false,
        color: r.SKYBLUE
    }

    const p2 = {
        x: 340,
        y: 0,
        width: 110,
        height: windowHeight,
        isVertical: false,
        color: r.SKYBLUE
    }

    const p3 = {
        x: 0,
        y: 20,
        width: windowWidth,
        height: 40,
        isVertical: true,
        color: r.SKYBLUE
    }


    return { d1, d2, d3, p1, p2, p3 }
}

module.exports = {
    getData
}