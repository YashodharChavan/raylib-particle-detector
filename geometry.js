function checkPointInRange(rangeStart, rangeEnd, pointStart, pointEnd) {
    return !(rangeStart > pointEnd || rangeEnd < pointStart)
        || !(pointEnd > rangeStart || pointStart < rangeEnd)
}

function getDetectorVelocity(detector) {
    const detectorEnd = detector.coordinate + detector.dimension;
    const isDetectorBeyondEnd = detectorEnd >= detector.maxRange;
    const isDetectorBeforeStart = detector.coordinate < detector.minRange

    return (isDetectorBeyondEnd || isDetectorBeforeStart) ? -detector.velocity : detector.velocity;
}

function checkRangeOverlap(detectorCoordinate, detectorSize, particleCoordinate, particleSize) {
    const detectorEnd = detectorCoordinate + detectorSize;
    const particleEnd = particleCoordinate + particleSize;
    const isPointInParticleRange = checkPointInRange(particleCoordinate, particleEnd, detectorCoordinate, detectorEnd);
    return isPointInParticleRange;
}

module.exports = {
    checkPointInRange,
    getDetectorVelocity: getDetectorVelocity,
    checkRangeOverlap,
}