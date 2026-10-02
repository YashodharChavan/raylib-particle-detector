function checkPointInRange(detector, particle) {
    const rangeStart = detector.isVertical? detector.y : detector.x;
    const rangeEnd = rangeStart + detector.dimension;

    const pointStart = particle.isVertical? particle.y : particle.x;
    const pointEnd = pointStart + particle.dimension

    return !(rangeStart > pointEnd || rangeEnd < pointStart)
}

function checkHorizontalRangeOverlap(detector, p1, p2) {
    const p1Status = checkPointInRange(detector, p1);
    const p2Status = checkPointInRange(detector, p2)
    return p1Status || p2Status;
}

function checkVerticalRangeOverlap(detector, p1) {
    const p1Status = checkPointInRange(detector, p1);
    return p1Status;
}

module.exports = {
    checkPointInRange,
    checkHorizontalRangeOverlap,
    checkVerticalRangeOverlap
}