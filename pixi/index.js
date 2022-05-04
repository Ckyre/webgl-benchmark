var app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
document.body.appendChild(app.view);

var graphics = new PIXI.Graphics();

for (let index = 0; index < OBJ_COUNT; index++) {
    graphics.beginFill(randomColor());
    graphics.drawRect(randomInt(900), randomInt(500), randomInt(300), randomInt(300));
    app.stage.addChild(graphics);
}
setObjCountText(OBJ_COUNT);

startFPSCount();