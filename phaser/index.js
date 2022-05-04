class Scene extends Phaser.Scene {
    preload() {
    }

    create() {
        // Draw 1000 rectangles
        console.log("Creating " + OBJ_COUNT + " objects");
        for (var ii = 0; ii < OBJ_COUNT; ++ii) {
            this.add.rectangle(randomInt(900), randomInt(500),randomInt(300), randomInt(300), Math.floor(Math.random() * 0xFFFFFF)).setOrigin(0, 0);
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

startFPSCount();