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
    detector.velocity = getUpdatedVelocity(detector);
    detector.x += (detector.isVertical) ? 0 : detector.velocity;
    detector.y += (detector.isVertical) ? detector.velocity : 0;

    return detector;
}

function updateDetector(detector, p1, p2, p3) {
    updateDetectorVelocity(detector);
    updateDetectorColor(detector, p1, p2, p3);
}

function getUpdatedVelocity(detector) {
    const coordinate = detector.isVertical ? detector.y : detector.x;
    const dimension = detector.isVertical ? detector.height : detector.width;

    const detectorEnd = coordinate + dimension;
    const hasCrossedEnd = detectorEnd >= detector.end;
    const hasCrossedStart = coordinate < detector.start;

    return (hasCrossedEnd || hasCrossedStart) ? -detector.velocity : detector.velocity;
}

function drawComponent(component) {
    r.DrawRectangle(component.x, component.y, component.width, component.height, component.color);

}
module.exports = {
    updateDetector,
    drawComponent
}