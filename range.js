function drawHorizontalParticleRange(particle) {
    r.DrawRectangle(particle.coordinate, 0, particle.dimension, windowHeight, particle.color);
}

function drawVerticalParticleRange(particle) {
    r.DrawRectangle(0, particle.coordinate, windowWidth, particle.dimension, particle.color);
}

function drawHorizontalDetector(detector) {
    r.DrawRectangle(detector.coordinate, 0, detector.dimension, windowHeight, detector.color);
}

function drawVerticalDetector(detector) {
    r.DrawRectangle(0, detector.coordinate, windowWidth, detector.dimension, detector.color);
}


module.exports = {
    drawHorizontalDetector, 
    drawHorizontalParticleRange, 
    drawVerticalDetector,
    drawVerticalParticleRange
}