const r = require("raylib")
const g = require("./geometry")
const d1 = require("./d1.js")
const d2 = require("./d2.js")
const d3 = require("./d3.js")
/* 
    --- Detector Details ---
    d1.detector = first horizontal scanner
    d2.detector = second horizontal scanner
    d3.detector = third vertical scanner

    --- particle details ---
    d1.particle = first vertical particle range
    d2.particle = second vertical particle range
    d3.particle = third horizontal particle range
*/

const windowWidth = 700;
const windowHeight = 400;

function setup() {
    const windowTitle = "SCANNER";
    const FPS = 60;

    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(FPS);

    d2.detectorX = windowWidth / 2;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function calculateColor(reference, detectorCordinate, scannerDimension, particleX, particleWidth) {
    reference.isRangeOverlap = g.checkRangeOverlap(detectorCordinate, scannerDimension, particleX, particleWidth)
    reference.color = (reference.isRangeOverlap) ? r.RED : r.WHITE 
}

function update() {
    d1.detectorVelocity = g.handleScannerDirectionChange(d1.detectorX, d1.detectorWidth, windowWidth / 2, 0, d1.detectorVelocity);
    d1.detectorX += d1.detectorVelocity;

    d2.detectorVelocity = g.handleScannerDirectionChange(d2.detectorX, d2.detectorWidth, windowWidth, windowWidth / 2, d2.detectorVelocity);
    d2.detectorX += d2.detectorVelocity;

    d3.detectorVelocity = g.handleScannerDirectionChange(d3.detectorY, d3.detectorHeight, windowHeight, 0, d3.detectorVelocity);
    d3.detectorY += d3.detectorVelocity;
}

function drawHorizontalParticleRange(particleX, particleWidth) {
    r.DrawRectangle(particleX, 0, particleWidth, windowHeight, r.SKYBLUE);
}

function drawVerticalParticleRange(particleY, particleHeight) {
    r.DrawRectangle(0, particleY, windowWidth, particleHeight, r.SKYBLUE);
}

function drawHorizontalDetector(scannerX, scannerWidth, color) {
    r.DrawRectangle(scannerX, 0, scannerWidth, windowHeight, color);
}

function drawVerticalDetector(scannerY, scannerHeight, color) {
    r.DrawRectangle(0, scannerY, windowWidth, scannerHeight, color);
}

function draw() {
    const particleAX = 40;
    const particleAWidth = 30;

    const particleBX = 500;
    const particleBWidth = 40;

    const particleCY = 30;
    const particleCHeight = 40;

    calculateColor(d1, d1.detectorX, d1.detectorWidth, particleAX, particleAWidth);
    calculateColor(d2, d2.detectorX, d2.detectorWidth, particleBX, particleBWidth);
    calculateColor(d3, d3.detectorY, d3.detectorHeight, particleCY, particleCHeight);

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawHorizontalParticleRange(particleAX, particleAWidth);
    drawHorizontalParticleRange(particleBX, particleBWidth);
    drawVerticalParticleRange(particleCY, particleCHeight);

    drawHorizontalDetector(d1.detectorX, d1.detectorWidth, d1.color);
    drawHorizontalDetector(d2.detectorX, d2.detectorWidth, d2.color);
    drawVerticalDetector(d3.detectorY, d3.detectorHeight, d3.color);

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