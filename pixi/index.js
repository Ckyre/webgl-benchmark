var app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
document.body.appendChild(app.view);

if(OBJ_TEXTURED)
{
    for (let index = 0; index < OBJ_COUNT; index++) {
        if(index % 2 === 0) {
            var sprite = PIXI.Sprite.from("https://picsum.photos/1920/1080");
            sprite.x = randomInt(900);
            sprite.y = randomInt(500);
            sprite.width = randomInt(OBJ_MAX_SIZE);
            sprite.height = randomInt(OBJ_MAX_SIZE);
            app.stage.addChild(sprite);

        } else {
            var sprite = PIXI.Sprite.from("https://picsum.photos/800/600");
            sprite.x = randomInt(900);
            sprite.y = randomInt(500);
            sprite.width = randomInt(OBJ_MAX_SIZE);
            sprite.height = randomInt(OBJ_MAX_SIZE);
            app.stage.addChild(sprite);
        }
    }
    
}
else
{
    var graphics = new PIXI.Graphics();
    for (let index = 0; index < OBJ_COUNT; index++) {
        graphics.beginFill(randomColor());
        graphics.drawRect(randomInt(900), randomInt(500), randomInt(OBJ_MAX_SIZE), randomInt(OBJ_MAX_SIZE));
        app.stage.addChild(graphics);
    }
}

setObjCountText(OBJ_COUNT);
startFPSCount();