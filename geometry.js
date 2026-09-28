function checkPointInRange(rangeStart, rangeEnd, pointStart, pointEnd) {
    return !(rangeStart > pointEnd || rangeEnd < pointStart)
}

// function checkPointInRange(rangeStart, rangeEnd, pointStart, pointEnd) {
//     return (pointEnd >= rangeStart && pointEnd <= rangeEnd)
//         || (pointStart >= rangeStart && pointStart <= rangeEnd)
//         || (rangeStart >= pointEnd && rangeEnd <= pointEnd)
//         || (rangeStart >= pointStart && rangeEnd <= pointEnd);
// }

function handleScannerDirectionChange(scannerCoordinate, scannerDimension, maxRangeWidth, minRangeWidth, scannerSpeed) {
    const scannerRightX = scannerCoordinate + scannerDimension;
    return (scannerRightX >= maxRangeWidth || scannerCoordinate < minRangeWidth) ? -scannerSpeed : scannerSpeed;
}

function checkRangeOverlap(scannerX, scannerWidth, particleX, particleWidth) {
    const scannerRightX = scannerX + scannerWidth;
    const particleRightX = particleX + particleWidth;

    const isPointInParticleRange = checkPointInRange(particleX, particleRightX, scannerX, scannerRightX);

    return (isPointInParticleRange);
}

module.exports = {
    checkPointInRange,
    handleScannerDirectionChange,
    checkRangeOverlap,
}