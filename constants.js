const OBJ_COUNT = 500;
const OBJ_MAX_SIZE = 500;
const OBJ_TEXTURED = true;
const BABYLON_IMG_URL = "https://assets.babylon.gamestream.biz/";

// Update navigation UI
var fpsText;
var objectsText;

function initMenu() {
    document.querySelector("#menu").innerHTML = `
    <div>
        <p id="fps">-- FPS</p>
        <span id="objs">--- objects in scene</span>
    </div>
    <div class="links">
        <p>Others benchmarks</p>
        <div class="row">
            <div class="col">
                <a href="../webgl">WebGL</a>
                <a href="../phaser">Phaser</a>
                <a href="../pixi">PIXI</a>
                </div>
                <div class="col">
                <a href="../threejs">THREEJS</a>
                <a href="../Babylon">BABYLON</a>
            </div>
        </div>
        
    </div>
    `;

    fpsText = document.querySelector("#fps");
    objectsText = document.querySelector("#objs");
}
initMenu();

const times = [];
var fps;

function startFPSCount() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;

        fpsText.innerHTML = fps + " FPS";

        startFPSCount();
    });
}

function setObjCountText(count) {
    console.log("Creating " + count + " objects");
    objectsText.innerHTML = count + " objects in the scene";
}

// Random
function randomInt(range) {
    return Math.floor(Math.random() * range);
}

function randomColor() {
    return Math.floor(Math.random() * 0xFFFFFF);
}

function randomColorString() {
    let color = "#";
    const hexCol = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 6; i += 1) {
        color += hexCol[randomInt(16)];
    }
    return color;
}