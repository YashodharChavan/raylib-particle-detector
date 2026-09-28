// Usind DeMorgans theorem, simplified format is: 
function checkPointInRange(rangeStart, rangeEnd, pointStart, pointEnd) {
    return !(rangeStart > pointEnd || rangeEnd < pointStart)
        || !(pointEnd > rangeStart || pointStart < rangeEnd)
}

function getDetectorVelocity(detectorCordinate, detectorDimension, maxRangeWidth, minRangeWidth, detectorVelocity) {
    const detectorEnd = detectorCordinate + detectorDimension;
    const isDetectorBeyondEnd = detectorEnd >= maxRangeWidth;
    const isDetectorBeforeStart = detectorCordinate < minRangeWidth
    return (isDetectorBeyondEnd || isDetectorBeforeStart) ? -detectorVelocity : detectorVelocity;
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