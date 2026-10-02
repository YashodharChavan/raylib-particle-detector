const r = require("raylib")
const g = require("./geometry");
// const range = require("./range")
let d1, d2, d3;
let p1, p2, p3;

const windowWidth = 700;
const windowHeight = 400;

function setup() {
    const windowTitle = "DETECTOR PARTICLE";
    const FPS = 60;

    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(FPS);

    d1 = createDetector(0, 3, 40, 0, windowWidth / 2, false);
    d2 = createDetector(windowWidth / 2, 4, 40, windowWidth / 2, windowWidth, false);
    d3 = createDetector(0, 3, 40, 0, windowHeight, true);

    p1 = createParticleField(40, 30, false);
    p2 = createParticleField(200, 40, false);
    p3 = createParticleField(30, 40, true);
}

function createDetector(coordinate, velocity, dimension, minRange, maxRange, isVertical) {
    return {
        coordinate,
        velocity,
        dimension,
        minRange,
        maxRange,
        isVertical,
        overlapStatus: false,
        color: r.WHITE,
    }
}

function createParticleField(coordinate, dimension, isVertical) {
    return {
        coordinate,
        dimension,
        isVertical,
        color: r.SKYBLUE
    }
}

function isRunning() {
    return !r.WindowShouldClose();
}

function setDetectorColor(detector, p1, p2, p3) {
    detector.isRangeOverlap = (detector.isVertical) ? g.checkPointInRange(detector, p3) : g.checkRangeOverlap(detector, p1, p2)

    detector.color = (detector.isRangeOverlap) ? r.RED : r.WHITE
    return detector;
}

function updateDetectorVelocity(detector) {
    detector.velocity = g.getDetectorVelocity(detector);
    detector.coordinate += detector.velocity;
    return detector;
}

function updateDetector(detector, p1, p2, p3) {
    updateDetectorVelocity(detector);
    setDetectorColor(detector, p1, p2, p3);
}

function update() {
    updateDetector(d1, p1, p2, p3);
    updateDetector(d2, p1, p2, p3);
    updateDetector(d3, p1, p2, p3);
}

function drawParticleRange(particle) {
    if(particle.isVertical) {
         r.DrawRectangle(0, particle.coordinate, windowWidth, particle.dimension, particle.color);
    }
    else {
        r.DrawRectangle(particle.coordinate, 0, particle.dimension, windowHeight, particle.color);
    }
}

function drawDetector(detector) {
    if(detector.isVertical) {
        r.DrawRectangle(0, detector.coordinate, windowWidth, detector.dimension, detector.color);
    }
    else {
        r.DrawRectangle(detector.coordinate, 0, detector.dimension, windowHeight, detector.color);
    }
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleRange(p1);
    drawParticleRange(p2);
    drawParticleRange(p3);

    drawDetector(d1);
    drawDetector(d2);
    drawDetector(d3);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    teardown,
}