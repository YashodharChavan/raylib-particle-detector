const r = require("raylib")
const g = require("./geometry")
const d1 = require("./d1.js")
const d2 = require("./d2.js")
const d3 = require("./d3.js")
/* 
    --- Scanner Details ---
    detectorA = first horizontal scanner
    detectorB = second horizontal scanner
    detectorC = third vertical scanner

    --- particle details ---
    particleA = first horizontal particle range
    particleB = second horizontal particle range
    particleC = third horizontal particle range
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

function getDynamicColor(detectorCordinate, scannerDimension, particleX, particleWidth) {
    const isRangeOverlap = g.checkRangeOverlap(detectorCordinate, scannerDimension, particleX, particleWidth)
    return (isRangeOverlap) ? r.RED : r.WHITE
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

    const detectorAColor = getDynamicColor(d1.detectorX, d1.detectorWidth, particleAX, particleAWidth);
    const detectorBColor = getDynamicColor(d2.detectorX, d2.detectorWidth, particleBX, particleBWidth);
    const detectorCColor = getDynamicColor(d3.detectorY, d3.detectorHeight, particleCY, particleCHeight);

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawHorizontalParticleRange(particleAX, particleAWidth);
    drawHorizontalParticleRange(particleBX, particleBWidth);
    drawVerticalParticleRange(particleCY, particleCHeight);

    drawHorizontalDetector(d1.detectorX, d1.detectorWidth, detectorAColor);
    drawHorizontalDetector(d2.detectorX, d2.detectorWidth, detectorBColor);
    drawVerticalDetector(d3.detectorY, d3.detectorHeight, detectorCColor);

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