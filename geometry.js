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


module.exports = {
    checkPointInRange,
    handleScannerDirectionChange,
}