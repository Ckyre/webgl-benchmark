setObjCountText(OBJ_COUNT);
startFPSCount();

function main() {
    // This creates a basic Babylon Scene object (non-mesh)
    const canvas = document.querySelector('canvas');
    const engine = new BABYLON.Engine(canvas, false, {
            disableWebGL2Support: true,
        },
        true);
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

    var printSpecs = function() {
        console.log("webgl ver: " + engine.webGLVersion);
        console.log("capable of astc ? " + engine.getCaps().astc);
        console.log("capable of blendMinMax ? " + engine.getCaps().blendMinMax);
        console.log("capable of bptc ? " + engine.getCaps().bptc);
        console.log("capable of canUseGLInstanceID ? " + engine.getCaps().canUseGLInstanceID);
        console.log("capable of canUseGLVertexID ? " + engine.getCaps().canUseGLVertexID);
        console.log("capable of canUseTimestampForTimerQuery ? " + engine.getCaps().canUseTimestampForTimerQuery);
        console.log("capable of colorBufferFloat ? " + engine.getCaps().colorBufferFloat);
        console.log("capable of depthTextureExtension ? " + engine.getCaps().depthTextureExtension);
        console.log("capable of drawBuffersExtension ? " + engine.getCaps().drawBuffersExtension);
        console.log("capable of etc1 ? " + engine.getCaps().etc1);
        console.log("capable of etc2 ? " + engine.getCaps().etc2);
        console.log("capable of fragmentDepthSupported ? " + engine.getCaps().fragmentDepthSupported);
        console.log("capable of highPrecisionShaderSupported ? " + engine.getCaps().highPrecisionShaderSupported);
        console.log("capable of instancedArrays ? " + engine.getCaps().instancedArrays);
        console.log("capable of maxAnisotropy ? " + engine.getCaps().maxAnisotropy);
        console.log("capable of maxCombinedTexturesImageUnits ? " + engine.getCaps().maxCombinedTexturesImageUnits);
        console.log("capable of maxCubemapTextureSize ? " + engine.getCaps().maxCubemapTextureSize);
        console.log("capable of maxFragmentUniformVectors ? " + engine.getCaps().maxFragmentUniformVectors);
        console.log("capable of maxMSAASamples ? " + engine.getCaps().maxMSAASamples);
        console.log("capable of maxRenderTextureSize ? " + engine.getCaps().maxRenderTextureSize);
        console.log("capable of maxSamples ? " + engine.getCaps().maxSamples);
        console.log("capable of maxTextureSize ? " + engine.getCaps().maxTextureSize);
        console.log("capable of maxTexturesImageUnits ? " + engine.getCaps().maxTexturesImageUnits);
        console.log("capable of maxVaryingVectors ? " + engine.getCaps().maxVaryingVectors);
        console.log("capable of maxVertexAttribs ? " + engine.getCaps().maxVertexAttribs);
        console.log("capable of maxVertexTextureImageUnits ? " + engine.getCaps().maxVertexTextureImageUnits);
        console.log("capable of maxVertexUniformVectors ? " + engine.getCaps().maxVertexUniformVectors);
        console.log("capable of multiview ? " + engine.getCaps().multiview);
        console.log("capable of oculusMultiview ? " + engine.getCaps().oculusMultiview);
        console.log("capable of parallelShaderCompile ? " + engine.getCaps().parallelShaderCompile);
        console.log("capable of pvrtc ? " + engine.getCaps().pvrtc);
        console.log("capable of s3tc ? " + engine.getCaps().s3tc);
        console.log("capable of s3tc_srgb ? " + engine.getCaps().s3tc_srgb);
        console.log("capable of standardDerivatives ? " + engine.getCaps().standardDerivatives);
        console.log("capable of supportComputeShaders ? " + engine.getCaps().supportComputeShaders);
        console.log("capable of supportOcclusionQuery ? " + engine.getCaps().supportOcclusionQuery);
        console.log("capable of supportSRGBBuffers ? " + engine.getCaps().supportSRGBBuffers);
        console.log("capable of supportTransformFeedbacks ? " + engine.getCaps().supportTransformFeedbacks);
        console.log("capable of textureAnisotropicFilterExtension ? " + engine.getCaps().textureAnisotropicFilterExtension);
        console.log("capable of textureFloat ? " + engine.getCaps().textureFloat);
        console.log("capable of textureFloatLinearFiltering ? " + engine.getCaps().textureFloatLinearFiltering);
        console.log("capable of textureFloatRender ? " + engine.getCaps().textureFloatRender);
        console.log("capable of textureHalfFloat ? " + engine.getCaps().textureHalfFloat);
        console.log("capable of textureHalfFloatLinearFiltering ? " + engine.getCaps().textureHalfFloatLinearFiltering);
        console.log("capable of textureHalfFloatRender ? " + engine.getCaps().textureHalfFloatRender);
        console.log("capable of textureLOD ? " + engine.getCaps().textureLOD);
        console.log("capable of textureMaxLevel ? " + engine.getCaps().textureMaxLevel);
        console.log("capable of timerQuery ? " + engine.getCaps().timerQuery);
        console.log("capable of uintIndices ? " + engine.getCaps().uintIndices);
        console.log("capable of vertexArrayObject ? " + engine.getCaps().vertexArrayObject);
    }

    printSpecs();

    /**
     * retrieve the list of images
     */
    async function fetchImages() {
        await fetch('../babylon.json')
            .then(response => {
                return response.json();
            }).then(data => {
                data.forEach(element => {
                    try {
                        const pic = element.assets.en.cover_square
                        if (pic != null) {
                            // console.log(pic);
                            images.push(pic);
                        }
                    } catch (error) {
                        // console.log(element.assets.en.title + " no cover");
                    }
                });
                console.log("images count: " + images.length);
            });
    }

    /**
     * Add a grid to a scroll view and populate it
     * @param {BABYLON.GUI.ScrollViewer} scrollview 
     */
    var populateView = function(scrollview) {
        if (scrollview != null) {


            // scrollview.setBucketSizes(500, 210);

            // Setup the grid
            var gd = new BABYLON.GUI.Grid();
            gd.width = 1;
            gd.height = Math.ceil(OBJ_COUNT / 4) * 200 + "px";
            for (let i = 0; i < Math.ceil(OBJ_COUNT / 4); i += 1) {
                gd.addRowDefinition(1.0 / OBJ_COUNT / 4);
            }
            gd.addColumnDefinition(1 / 4);
            gd.addColumnDefinition(1 / 4);
            gd.addColumnDefinition(1 / 4);
            gd.addColumnDefinition(1 / 4);

            // Add the grid to the view
            scrollview.addControl(gd);

            // add OBJ_COUNT rect to the grid
            for (let i = 0; i < OBJ_COUNT; i += 1) {

                var rect;
                // select rect texture
                if (OBJ_TEXTURED) {
                    rect = new BABYLON.GUI.Image("" + i, BABYLON_IMG_URL + images[randomInt(images.length)]);
                    rect.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
                } else {
                    rect = new BABYLON.GUI.Rectangle("" + i);
                    rect.background = randomColorString();
                    rect.thickness = 0;
                }

                rect.width = 1;
                rect.height = 1;
                rect.paddingTop = "8px";
                rect.paddingBottom = "8px";
                rect.paddingLeft = "8px";
                rect.paddingRight = "8px";

                // Add the rect to the grid
                gd.addControl(rect, Math.floor(i / 4), i % 4);
            }
        }
    }

    /**
     * Setup the whole GUI
     * @param {BABYLON.Scene} scene 
     */
    async function loadGui(scene) {
        // load the GUI from file
        advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
        await advancedTexture.parseFromURLAsync("./guiTexture.json");
        advancedTexture.idealWidth = 1920;

        // look for every necessary Control
        const navbar = advancedTexture.getControlByName("StackPanel");
        const btnHome = advancedTexture.getControlByName("Nav_Home");
        const btn1 = advancedTexture.getControlByName("Nav_Btn1");
        const btn2 = advancedTexture.getControlByName("Nav_Btn2");
        var display_zone = advancedTexture.getControlByName("DisplayZone");

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

        // btnHome clears the display_zone
        if (btnHome != null) {
            btnHome.onPointerClickObservable.add(function() {
                console.log("click home");
                if (display_zone) {
                    display_zone.freezeControls = false;
                    display_zone.setBucketSizes(0, 0);
                    let children = display_zone.getDescendants();
                    children.forEach(child => {
                        child.dispose();
                    });
                }
            });
        }

        // btn1 clears then repopulate the display_zone
        if (btn1 != null) {
            btn1.onPointerClickObservable.add(async function() {
                console.log("click btn1");
                if (images.length == 0) {
                    // fetch all the possible images
                    await fetchImages();
                }
                display_zone.freezeControls = false;
                if (display_zone) {
                    let children = display_zone.getDescendants();
                    children.forEach(child => {
                        child.dispose();
                    });
                }
                populateView(display_zone);
                display_zone.freezeControls = true;
            });
        }

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