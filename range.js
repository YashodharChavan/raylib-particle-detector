function isPointInRange(detector, particle) {
  const rangeStart = detector.isVertical ? detector.y : detector.x;
  const detectorDimension = detector.isVertical ? detector.height : detector.width;
  const rangeEnd = rangeStart + detectorDimension;

  const particleDimension = particle.isVertical ? particle.height : particle.width;
  const pointStart = particle.isVertical ? particle.y : particle.x;
  const pointEnd = pointStart + particleDimension

  return !(rangeStart > pointEnd || rangeEnd < pointStart)
}

function doesHorizontalRangeOverlap(detector, p1, p2) {
  const p1Status = isPointInRange(detector, p1);
  const p2Status = isPointInRange(detector, p2)
  return p1Status || p2Status;
}

function doesVerticalRangeOverlap(detector, p1) {
  const p1Status = isPointInRange(detector, p1);
  return p1Status;
}

module.exports = {
  doesHorizontalRangeOverlap,
  doesVerticalRangeOverlap
}