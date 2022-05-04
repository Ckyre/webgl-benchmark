const OBJ_COUNT = 2000;
document.querySelector("#obj-count").innerHTML = OBJ_COUNT + " objects in the scene";

const times = [];
let fps;
var fpsText = document.querySelector("#fps");

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

function randomInt(range) {
    return Math.floor(Math.random() * range);
}