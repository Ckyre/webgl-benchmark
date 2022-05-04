setObjCountText(OBJ_COUNT);
startFPSCount();

function main() {
    // This creates a basic Babylon Scene object (non-mesh)
    const canvas = document.querySelector('canvas');
    const engine = new BABYLON.Engine(canvas, false);

    var createScene = function() {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.Black;

        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
        // camera.attachControl(canvas, true);

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
        for (let i = 0; i < OBJ_COUNT; i += 1) {
            const w = randomInt(300);
            const h = randomInt(300);

            let rect = new BABYLON.GUI.Rectangle("rect");
            rect.alpha = 1;
            rect.width = "" + w + "px";
            rect.height = "" + h + "px";
            rect.left = randomInt(900) - window.innerWidth / 2 + w;
            rect.top = randomInt(500) - window.innerHeight / 2 + h;
            rect.background = randomColorString();
            rect.thickness = 0;
            advancedTexture.addControl(rect);
        }

        return scene;
    }

    var sceneToRender = createScene();

    engine.runRenderLoop(function() {
        sceneToRender.render();
    });
}

main();