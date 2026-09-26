const r = require("raylib")

const windowTitle = "SCANNER";
const windowWidth = 700;
const windowHeight = 400;
const FPS = 60;

let scannerAX = 0;
let scannerASpeed = 3;
let scannerAColor = r.WHITE;
const scannerAWidth = 40;

let scannerBX = windowWidth / 2;
let scannerBSpeed = 8;
let scannerBColor = r.WHITE;
const scannerBWidth = 30;

const particleAX = 40;
const particleAWidth = 30;

const particleBX = 500;
const particleBWidth = 40;

function setup() {
    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(FPS);
}

function isRunning() {
    return !r.WindowShouldClose();
}

// it detects overlap in both ways, first one slider inside particle, and particle inside slider. In many cases, slider width can be more than particle width, so it is used to handle that case. 
function checkPointInRange(rangeStart, rangeEnd, start, end) {
    return (end >= rangeStart && end <= rangeEnd)
        || (start >= rangeStart && start <= rangeEnd)
        || (rangeStart >= end && rangeEnd <= end)
        || (rangeStart >= start && rangeEnd <= end);
}

function checkRangeOverlap(scannerX, scannerWidth) {
    // top-right coordinate of the scanner, particleA and particleB
    const scannerRightX = scannerX + scannerWidth;
    const particleARightX = particleAX + particleAWidth;
    const particleBRightX = particleBX + particleBWidth;

    const isPointInParticleARange = checkPointInRange(particleAX, particleARightX, scannerX, scannerRightX);
    const isPointInParticleBRange = checkPointInRange(particleBX, particleBRightX, scannerX, scannerRightX);

    return (isPointInParticleARange || isPointInParticleBRange);
}

function handleScannerADirectionChange(scannerAOffsetX) {
    const scannerRightX = scannerAX + scannerAWidth;
    return (scannerRightX >= windowWidth / 2 || scannerAX < 0) ? -scannerAOffsetX : scannerAOffsetX;
}

function handleScannerBDirectionChange(scannerBOffsetX) {
    const scannerRightX = scannerBX + scannerBWidth;
    return (scannerRightX >= windowWidth || scannerBX < windowWidth / 2) ? -scannerBOffsetX : scannerBOffsetX;
}

function update() {
    scannerASpeed = handleScannerADirectionChange(scannerASpeed);
    scannerAX += scannerASpeed;

    scannerBSpeed = handleScannerBDirectionChange(scannerBSpeed);
    scannerBX += scannerBSpeed;

    scannerAColor = checkRangeOverlap(scannerAX, scannerAWidth) ? r.RED : r.WHITE;
    scannerBColor = checkRangeOverlap(scannerBX, scannerBWidth) ? r.RED : r.WHITE;
}

function drawParticleRanges() {
    const commonParticleY = 0;
    const commonParticleHeight = windowHeight;

    r.DrawRectangle(particleAX, commonParticleY, particleAWidth, commonParticleHeight, r.SKYBLUE);

    r.DrawRectangle(particleBX, commonParticleY, particleBWidth, commonParticleHeight, r.SKYBLUE);
}

function draw() {
    const commonScannerY = 0;
    const commonScannerHeight = windowHeight;

    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticleRanges();

    r.DrawRectangle(scannerAX, commonScannerY, scannerAWidth, commonScannerHeight, scannerAColor);

    r.DrawRectangle(scannerBX, commonScannerY, scannerBWidth, commonScannerHeight, scannerBColor);

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