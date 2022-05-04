class Scene extends Phaser.Scene {
    preload() {
        if(OBJ_TEXTURED) {
            this.load.image("image1", "https://picsum.photos/1920/1080");
            this.load.image("image2", "https://picsum.photos/800/600");
        }
    }

    create() {

        // Sprites
        if(OBJ_TEXTURED)
        {
            for (var ii = 0; ii < OBJ_COUNT; ++ii) {    
                if(ii % 2 === 0) {
                    var sprite = this.add.sprite(randomInt(900), randomInt(500), "image1");
                    sprite.width = randomInt(OBJ_MAX_SIZE);
                    sprite.height = randomInt(OBJ_MAX_SIZE);
                } else {
                    var sprite = this.add.sprite(randomInt(900), randomInt(500), "image2").setScale(0.4);
                    sprite.width = randomInt(OBJ_MAX_SIZE);
                    sprite.height = randomInt(OBJ_MAX_SIZE);
                }
            }
        }
        // Rectangles
        else
        {
            for (var ii = 0; ii < OBJ_COUNT; ++ii) {    
                this.add.rectangle(randomInt(900), randomInt(500), randomInt(OBJ_MAX_SIZE), randomInt(OBJ_MAX_SIZE), randomColor()).setOrigin(0, 0);
            }
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