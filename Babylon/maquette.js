setObjCountText(OBJ_COUNT);
startFPSCount();

function main() {
    // This creates a basic Babylon Scene object (non-mesh)
    const canvas = document.querySelector('canvas');
    const engine = new BABYLON.Engine(canvas, false, {
            disableWebGL2Support: true,
        },
        false);
    var advancedTexture;
    const images = [];

    // Gamepads events
    const gamepadManager = new BABYLON.GamepadManager();
    var gamepad0;

    gamepadManager.onGamepadConnectedObservable.add((gamepad, state) => {
        console.log("Gamepad ", gamepad.index, " connected");
        gamepad0 = gamepad;
    });
    gamepadManager.onGamepadDisconnectedObservable.add((gamepad, state) => {
        console.log("Gamepad ", gamepad.index, " disconnected");
        gamepad0 = undefined;
    });

    /**
     * Setup the whole GUI
     * @param {BABYLON.Scene} scene 
     */
    async function loadGui(scene) {
        // load the GUI from file
        advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
        await advancedTexture.parseFromURLAsync("./Layouts/GamePage.json");

        var stats = new BABYLON.GUI.TextBlock();
        stats.top = "55px";
        stats.left = "-50px";
        stats.text = "";
        stats.width = "500px";
        stats.marginLeft = "5px";
        stats.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        stats.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        stats.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        stats.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        stats.fontSize = 20;
        stats.color = "white";
        stats.outlineColor = "black";
        stats.outlineWidth = 3;
        advancedTexture.addControl(stats);

        // scene.onBeforeRenderObservable.add(() => advancedTexture.markAsDirty()); // make sure the GUI is redrawn continously

        scene.onAfterRenderObservable.add(() => {
            stats.text = advancedTexture.numLayoutCalls + " layout calls\n" + advancedTexture.numRenderCalls + " render calls";
        });
    }


    /**
     * Creates a scene 
     * @returns created BABYLON.Scene
     */
    var createScene = function() {
        // create the scene with WebGL1 or WebGL2
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.Black;

        // Add a camera to trigger interactions
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);

        // Add a light (not needed)
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // load the GUI
        loadGui(scene);


        return scene;
    }

    var sceneToRender = createScene();

    engine.runRenderLoop(function() {

        if (gamepad0 != undefined) {
            var values = gamepad0._leftStick;

            if (values.x > 0.1 || values.x < -0.1 || values.y > 0.1 || values.y < -0.1) {
                if (advancedTexture != undefined) {
                    advancedTexture.getControlByName("DisplayZone").verticalBar.value += (values.y / 25);
                }
            }
        }

        sceneToRender.render();
    });

}

main();