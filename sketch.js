const r = require("raylib")
const g = require("./geometry");
const range = require("./range")
let d1, d2, d3;

let p1, p2, p3;
const windowWidth = 700;
const windowHeight = 400;

function setup() {
    const windowTitle = "DETECTOR PARTICLE"; 
    const FPS = 60;

    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(FPS);

    d1 = createDetector(0, 3, 40, 0, windowWidth / 2);
    d2 = createDetector(windowWidth / 2, 4, 40, windowWidth / 2, windowWidth);
    d3 = createDetector(0, 3, 40, 0, windowHeight);

    p1 = createParticleField(40, 30);
    p2 = createParticleField(500, 40);
    p3 = createParticleField(30, 40);

}

function createDetector(coordinate, velocity, dimension, minRange, maxRange) {
    return {
        coordinate,
        velocity,
        dimension,
        minRange,
        maxRange,
        overlapStatus: false,
        color: r.WHITE,
    }
}

function createParticleField(coordinate, dimension) {
    return {
        coordinate, 
        dimension
    }
}

function isRunning() {
    return !r.WindowShouldClose();
}

function setDetectorColor(detector, particle) {
    detector.isRangeOverlap = g.checkRangeOverlap(detector.coordinate, detector.dimension, particle.coordinate, particle.dimension)
    detector.color = (detector.isRangeOverlap) ? r.RED : r.WHITE
    return detector;
}

function updateDetectorVelocity(ref) {
    ref.velocity = g.getDetectorVelocity(ref);
    ref.coordinate += ref.velocity;
    return ref;
}

function updateDetector(detector, particle) {
    updateDetectorVelocity(detector);
    setDetectorColor(detector, particle);
}

function update() {
    updateDetector(d1, p1);
    updateDetector(d2, p2);
    updateDetector(d3, p3);
}

function drawHorizontalParticleRange(particle) {
    r.DrawRectangle(particle.coordinate, 0, particle.dimension, windowHeight, particle.color);
}

function drawVerticalParticleRange(particle) {
    r.DrawRectangle(0, particle.coordinate, windowWidth, particle.dimension, particle.color);
}

function drawHorizontalDetector(detector) {
    r.DrawRectangle(detector.coordinate, 0, detector.dimension, windowHeight, detector.color);
}

function drawVerticalDetector(detector) {
    r.DrawRectangle(0, detector.coordinate, windowWidth, detector.dimension, detector.color);
}


function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawHorizontalParticleRange(p1);
    drawHorizontalParticleRange(p2);
    drawVerticalParticleRange(p3);

    drawHorizontalDetector(d1);
    drawHorizontalDetector(d2);
    drawVerticalDetector(d3);

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