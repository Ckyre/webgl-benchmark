class Scene extends Phaser.Scene {
    preload() {
    }

    create() {
        // Draw 1000 rectangles
        console.log("Creating " + OBJ_COUNT + " objects");
        for (var ii = 0; ii < OBJ_COUNT; ++ii) {
            this.add.rectangle(randomInt(900), randomInt(500),randomInt(300), randomInt(300), Math.floor(Math.random() * 0xFFFFFF));
        }
    }
}

var app = new Phaser.Game({
    type: Phaser.WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: Scene,
    backgroundColor: 0x000000
});

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

// FPS Counter
const times = [];
let fps;
var fpsText = document.querySelector("#fps");

function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;

    fpsText.innerHTML = fps + " FPS";

    refreshLoop();
  });
}

refreshLoop();