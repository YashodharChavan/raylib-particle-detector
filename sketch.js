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

const particleAX = 40;
const particleAWidth = 30;

const particleBX = 500;
const particleBWidth = 40;

const particleCY = 30;
const particleCHeight = 40;

function setup() {
    const windowTitle = "DETECTOR PARTICLE";
    const FPS = 60;

    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(FPS);

    setDetectorRanges(windowWidth, windowHeight);
}

function setDetectorRanges(width, height) {
    d1.minRange = 0;
    d1.maxRange = width / 2;

    d2.detectorX = width / 2;
    d2.minRange = width / 2;
    d2.maxRange = width;

    d3.minRange = 0;
    d3.maxRange = height;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function setDetectorColor(ref, detectorCordinate, detectorDimension, particleX, particleWidth) {
    ref.isRangeOverlap = g.checkRangeOverlap(detectorCordinate, detectorDimension, particleX, particleWidth)
    ref.color = (ref.isRangeOverlap) ? r.RED : r.WHITE
}

function updateHorizontalDetectorVelocity(ref) {
    ref.detectorVelocity = g.getDetectorVelocity(ref.detectorX, ref.detectorWidth, ref.maxRange, ref.minRange, ref.detectorVelocity);
    ref.detectorX += ref.detectorVelocity;
}

function updateVerticalDetectorVelocity(ref) {
    ref.detectorVelocity = g.getDetectorVelocity(ref.detectorY, ref.detectorHeight, ref.maxRange, ref.minRange, ref.detectorVelocity);
    ref.detectorY += ref.detectorVelocity;
}

function update() {
    updateHorizontalDetectorVelocity(d1);
    updateHorizontalDetectorVelocity(d2);
    updateVerticalDetectorVelocity(d3);

    setDetectorColor(d1, d1.detectorX, d1.detectorWidth, particleAX, particleAWidth);
    setDetectorColor(d2, d2.detectorX, d2.detectorWidth, particleBX, particleBWidth);
    setDetectorColor(d3, d3.detectorY, d3.detectorHeight, particleCY, particleCHeight);
}

function drawHorizontalParticleRange(particleX, particleWidth) {
    r.DrawRectangle(particleX, 0, particleWidth, windowHeight, r.SKYBLUE);
}

function drawVerticalParticleRange(particleY, particleHeight) {
    r.DrawRectangle(0, particleY, windowWidth, particleHeight, r.SKYBLUE);
}

function drawHorizontalDetector(ref) {
    r.DrawRectangle(ref.detectorX, 0,  ref.detectorWidth, windowHeight, ref.color);
}

function drawVerticalDetector(ref) {
    r.DrawRectangle(0, ref.detectorY, windowWidth, ref.detectorHeight, ref.color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawHorizontalParticleRange(particleAX, particleAWidth);
    drawHorizontalParticleRange(particleBX, particleBWidth);
    drawVerticalParticleRange(particleCY, particleCHeight); 

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