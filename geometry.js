// Usind DeMorgans theorem, simplified format is: 
function checkPointInRange(rangeStart, rangeEnd, pointStart, pointEnd) {
    return !(rangeStart > pointEnd || rangeEnd < pointStart) 
        || !(pointEnd > rangeStart || pointStart < rangeEnd)
}

// function checkPointInRange(rangeStart, rangeEnd, pointStart, pointEnd) {
//     return (pointEnd >= rangeStart && pointEnd <= rangeEnd)
//         || (pointStart >= rangeStart && pointStart <= rangeEnd)
//         || (rangeStart >= pointEnd && rangeEnd <= pointEnd)
//         || (rangeStart >= pointStart && rangeEnd <= pointEnd);
// }

function handleScannerDirectionChange(detectorCordinate, detectorDimension, maxRangeWidth, minRangeWidth, scannerSpeed) {
    const detectorEnd = detectorCordinate + detectorDimension;
    return (detectorEnd >= maxRangeWidth || detectorCordinate < minRangeWidth) ? -scannerSpeed : scannerSpeed;
}

function checkRangeOverlap(detectorDimension, detectorSize, particleDimension, particleSize) {
    const detectorEnd = detectorDimension + detectorSize;
    const particleEnd = particleDimension + particleSize;

    const isPointInParticleRange = checkPointInRange(particleDimension, particleEnd, detectorDimension, detectorEnd);
    return isPointInParticleRange;
}

module.exports = {
    checkPointInRange,
    handleScannerDirectionChange,
    checkRangeOverlap,
}