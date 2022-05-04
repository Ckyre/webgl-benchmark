const OBJ_COUNT = 2000;

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

function setObjCountText(count) {
    console.log("Creating " + count + " objects");
    document.querySelector("#obj-count").innerHTML = count + " objects in the scene";
}

function randomInt(range) {
    return Math.floor(Math.random() * range);
}

function randomColor() {
    return Math.floor(Math.random() * 0xFFFFFF);
}