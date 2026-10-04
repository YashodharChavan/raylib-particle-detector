const r = require("raylib")
const u = require("./utils");
const d = require("./data")

function setup() {
    const windowWidth = 700;
    const windowHeight = 400;

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(windowWidth, windowHeight, "PARTICLE DETECTOR");
    r.SetTargetFPS(60);
    world = d.getData(windowWidth, windowHeight);
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