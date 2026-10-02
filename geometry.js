function checkPointInRange(detector, particle) {
    const rangeStart = detector.coordinate;
    const rangeEnd = rangeStart + detector.dimension;

    const pointStart = particle.coordinate;
    const pointEnd = pointStart + particle.dimension

    return !(rangeStart > pointEnd || rangeEnd < pointStart)
}

function getDetectorVelocity(detector) {
    const detectorEnd = detector.coordinate + detector.dimension;
    const isDetectorBeyondEnd = detectorEnd >= detector.maxRange;
    const isDetectorBeforeStart = detector.coordinate < detector.minRange

    return (isDetectorBeyondEnd || isDetectorBeforeStart) ? -detector.velocity : detector.velocity;
}

function checkRangeOverlap(detector, p1, p2) {
    // const detectorEnd = detector.coordinate + detector.dimension;
    // const particleEnd = particle.coordinate + particle.dimension;

    const p1Status = checkPointInRange(detector, p1);
    const p2Status = checkPointInRange(detector, p2);
    return p1Status || p2Status;
}

module.exports = {
    checkPointInRange,
    getDetectorVelocity: getDetectorVelocity,
    checkRangeOverlap,
}