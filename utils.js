const range = require("./range");
const r = require('raylib')

function updateDetectorColor(detector, p1, p2, p3) {
    const verticalOverlap = range.checkVerticalRangeOverlap(detector, p3)
    const horizontalOverlap = range.checkHorizontalRangeOverlap(detector, p1, p2)

    detector.isRangeOverlap = (detector.isVertical) ? verticalOverlap : horizontalOverlap;
    detector.color = (detector.isRangeOverlap) ? r.RED : r.WHITE

    return detector;
}

function updateDetectorVelocity(detector) {
    detector.velocity = getDetectorVelocity(detector);
    detector.x += (detector.isVertical) ? 0 : detector.velocity;
    detector.y += (detector.isVertical) ? detector.velocity : 0;

    return detector;
}

function updateDetector(detector, p1, p2, p3) {
    updateDetectorVelocity(detector);
    updateDetectorColor(detector, p1, p2, p3);
}

function createDetector(velocity, dimension, minRange, maxRange, otherDimension, isVertical) {
    return {
        x: (isVertical) ? 0 : minRange,
        y: (isVertical) ? minRange : 0,
        velocity,
        minRange,
        dimension,
        maxRange,
        otherDimension,
        isVertical,
        overlapStatus: false,
        color: r.WHITE,
    }
}

function createParticleField(coordinate, dimension, otherDimension, isVertical) {
    return {
        x: (isVertical) ? 0 : coordinate,
        y: (isVertical) ? coordinate : 0,
        dimension,
        otherDimension,
        isVertical,
        color: r.SKYBLUE
    }
}

function getDetectorVelocity(detector) {
    const coordinate = detector.isVertical ? detector.y : detector.x;

    const detectorEnd = coordinate + detector.dimension;
    const hasCrossedEnd = detectorEnd >= detector.maxRange;
    const hasCrossedStart = coordinate < detector.minRange;

    return (hasCrossedEnd || hasCrossedStart) ? -detector.velocity : detector.velocity;
}

function drawComponent(component) {
    const width = component.isVertical ? component.otherDimension : component.dimension;
    const height = component.isVertical ? component.dimension : component.otherDimension;

    r.DrawRectangle(component.x, component.y, width, height, component.color);
}

module.exports = {
    updateDetector,
    createParticleField,
    createDetector,
    drawComponent
}