const r = require("raylib")
const g = require("./geometry")
/* 
    --- Scanner Details ---
    scannerA = first horizontal scanner
    scannerB = second horizontal scanner
    scannerC = third vertical scanner

    --- particle details ---
    particleA = first horizontal particle range
    particleB = second horizontal particle range
    particleC = third horizontal particle range
*/

const windowWidth = 700;
const windowHeight = 400;

let scannerAX = 0;
let scannerASpeed = 3;
const scannerAWidth = 40;

let scannerBX = windowWidth / 2;
let scannerBSpeed = 8;
const scannerBWidth = 30;

let scannerCY = 0;
let scannerCSpeed = 4;
const scannerCHeight = 30;

const particleAX = 40;
const particleAWidth = 30;

const particleBX = 500;
const particleBWidth = 40;

const particleCY = 30;
const particleCHeight = 40;


function setup() {
    const windowTitle = "SCANNER";
    const FPS = 60;

    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(FPS);
}

function isRunning() {
    return !r.WindowShouldClose();
}

function checkRangeOverlap(scannerX, scannerWidth) {
    const scannerRightX = scannerX + scannerWidth;
    const particleARightX = particleAX + particleAWidth;
    const particleBRightX = particleBX + particleBWidth;

    const isPointInParticleARange = g.checkPointInRange(particleAX, particleARightX, scannerX, scannerRightX);
    const isPointInParticleBRange = g.checkPointInRange(particleBX, particleBRightX, scannerX, scannerRightX);

    return (isPointInParticleARange || isPointInParticleBRange);
}

function getDynamicColor(scannerCordinate, scannerDimension) {
    return (checkRangeOverlap(scannerCordinate, scannerDimension)) ? r.RED : r.WHITE
}

function update() {
    scannerASpeed = g.handleScannerDirectionChange(scannerAX, scannerAWidth, windowWidth / 2, 0, scannerASpeed);
    scannerAX += scannerASpeed;

    scannerBSpeed = g.handleScannerDirectionChange(scannerBX, scannerBWidth, windowWidth, windowWidth / 2, scannerBSpeed);
    scannerBX += scannerBSpeed;

    scannerCSpeed = g.handleScannerDirectionChange(scannerCY, scannerCHeight, windowHeight, 0, scannerCSpeed);
    scannerCY += scannerCSpeed;
}

function drawParticleRanges() {
    const commonParticleY = 0;
    const commonParticleHeight = windowHeight;
    const particleCX = 0;

    r.DrawRectangle(particleAX, commonParticleY, particleAWidth, commonParticleHeight, r.SKYBLUE);
    r.DrawRectangle(particleBX, commonParticleY, particleBWidth, commonParticleHeight, r.SKYBLUE);
    r.DrawRectangle(particleCX, particleCY, windowWidth, particleCHeight, r.SKYBLUE);
}

function draw() {
    const commonScannerY = 0;
    const commonScannerHeight = windowHeight;
    const scannerCX = 0;

    const scannerAColor = getDynamicColor(scannerAX, scannerAWidth);
    const scannerBColor = getDynamicColor(scannerBX, scannerBWidth);
    const scannerCColor = getDynamicColor(scannerCY, scannerCHeight);

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleRanges();

    r.DrawRectangle(scannerAX, commonScannerY, scannerAWidth, commonScannerHeight, scannerAColor);
    r.DrawRectangle(scannerBX, commonScannerY, scannerBWidth, commonScannerHeight, scannerBColor);
    r.DrawRectangle(scannerCX, scannerCY, windowWidth, scannerCHeight, scannerCColor);

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