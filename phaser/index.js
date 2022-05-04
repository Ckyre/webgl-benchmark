class Scene extends Phaser.Scene {
    preload() {
    }

    create() {

        for (var ii = 0; ii < OBJ_COUNT; ++ii) {
            this.add.rectangle(randomInt(900), randomInt(500),randomInt(300), randomInt(300), randomColor()).setOrigin(0, 0);
        }
        setObjCountText(OBJ_COUNT);

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