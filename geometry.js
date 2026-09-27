function checkPointInRange(rangeStart, rangeEnd, start, end) {
    return (end >= rangeStart && end <= rangeEnd)
        || (start >= rangeStart && start <= rangeEnd)
        || (rangeStart >= end && rangeEnd <= end)
        || (rangeStart >= start && rangeEnd <= end);
}

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