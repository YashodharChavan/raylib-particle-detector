const r = require("raylib")
const u = require("./utils")

function setup() {
    const windowTitle = "DETECTOR PARTICLE";
    const windowWidth = 700;
    const windowHeight = 400;
    const FPS = 60;

    r.InitWindow(windowWidth, windowHeight, windowTitle);
    r.SetTargetFPS(FPS);

    const world = {}

    world.d1 = u.createDetector(3, 40, 0, windowWidth / 2, windowHeight, false);
    world.d2 = u.createDetector(4, 40, windowWidth / 2, windowWidth, windowHeight, false);
    world.d3 = u.createDetector(3, 40, 0, windowHeight, windowWidth, true);

    world.p1 = u.createParticleField(40, 30, windowHeight, false);
    world.p2 = u.createParticleField(200, 40, windowHeight, false);
    world.p3 = u.createParticleField(30, 40, windowWidth, true);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function update(world) {
    u.updateDetector(world.d1, world.p1, world.p2, world.p3);
    u.updateDetector(world.d2, world.p1, world.p2, world.p3);
    u.updateDetector(world.d3, world.p1, world.p2, world.p3);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    u.drawComponent(world.p1);
    u.drawComponent(world.p2);
    u.drawComponent(world.p3);

    u.drawComponent(world.d1);
    u.drawComponent(world.d2);
    u.drawComponent(world.d3);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    teardown,
}