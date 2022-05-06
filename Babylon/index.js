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

    function addSpecToGui(container, title, content) {
        const title_txt = new BABYLON.GUI.TextBlock();
        title_txt.width = 1;
        title_txt.height = "30px";
        title_txt.textWrapping = true;
        title_txt.text = title;

        const content_txt = new BABYLON.GUI.TextBlock();
        content_txt.width = 1;
        content_txt.height = "40px";
        title_txt.textWrapping = true;
        content_txt.text = content;

        const separator = new BABYLON.GUI.Rectangle("");
        separator.background = randomColorString();
        separator.thickness = 0;
        separator.width = 1;
        separator.height = "2px";

        container.addControl(title_txt);
        container.addControl(content_txt);
        container.addControl(separator);
    }

    function addSpecsToGui(container) {
        addSpecToGui(container, "webgl ver: ", engine.webGLVersion);
        addSpecToGui(container, "astc", engine.getCaps().astc);
        addSpecToGui(container, "blendMinMax", engine.getCaps().blendMinMax);
        addSpecToGui(container, "bptc", engine.getCaps().bptc);
        addSpecToGui(container, "canUseGLInstanceID", engine.getCaps().canUseGLInstanceID);
        addSpecToGui(container, "canUseGLVertexID", engine.getCaps().canUseGLVertexID);
        addSpecToGui(container, "canUseTimestampForTimerQuery", engine.getCaps().canUseTimestampForTimerQuery);
        addSpecToGui(container, "colorBufferFloat", engine.getCaps().colorBufferFloat);
        addSpecToGui(container, "depthTextureExtension", engine.getCaps().depthTextureExtension);
        addSpecToGui(container, "drawBuffersExtension", engine.getCaps().drawBuffersExtension);
        addSpecToGui(container, "etc1", engine.getCaps().etc1);
        addSpecToGui(container, "etc2", engine.getCaps().etc2);
        addSpecToGui(container, "fragmentDepthSupported", engine.getCaps().fragmentDepthSupported);
        addSpecToGui(container, "highPrecisionShaderSupported", engine.getCaps().highPrecisionShaderSupported);
        addSpecToGui(container, "instancedArrays", engine.getCaps().instancedArrays);
        addSpecToGui(container, "maxAnisotropy", engine.getCaps().maxAnisotropy);
        addSpecToGui(container, "maxCombinedTexturesImageUnits", engine.getCaps().maxCombinedTexturesImageUnits);
        addSpecToGui(container, "maxCubemapTextureSize", engine.getCaps().maxCubemapTextureSize);
        addSpecToGui(container, "maxFragmentUniformVectors", engine.getCaps().maxFragmentUniformVectors);
        addSpecToGui(container, "maxMSAASamples", engine.getCaps().maxMSAASamples);
        addSpecToGui(container, "maxRenderTextureSize", engine.getCaps().maxRenderTextureSize);
        addSpecToGui(container, "maxSamples", engine.getCaps().maxSamples);
        addSpecToGui(container, "maxTextureSize", engine.getCaps().maxTextureSize);
        addSpecToGui(container, "maxTexturesImageUnits", engine.getCaps().maxTexturesImageUnits);
        addSpecToGui(container, "maxVaryingVectors", engine.getCaps().maxVaryingVectors);
        addSpecToGui(container, "maxVertexAttribs", engine.getCaps().maxVertexAttribs);
        addSpecToGui(container, "maxVertexTextureImageUnits", engine.getCaps().maxVertexTextureImageUnits);
        addSpecToGui(container, "maxVertexUniformVectors", engine.getCaps().maxVertexUniformVectors);
        addSpecToGui(container, "multiview", engine.getCaps().multiview);
        addSpecToGui(container, "oculusMultiview", engine.getCaps().oculusMultiview);
        addSpecToGui(container, "parallelShaderCompile", engine.getCaps().parallelShaderCompile);
        addSpecToGui(container, "pvrtc", engine.getCaps().pvrtc);
        addSpecToGui(container, "s3tc", engine.getCaps().s3tc);
        addSpecToGui(container, "s3tc_srgb", engine.getCaps().s3tc_srgb);
        addSpecToGui(container, "standardDerivatives", engine.getCaps().standardDerivatives);
        addSpecToGui(container, "supportComputeShaders", engine.getCaps().supportComputeShaders);
        addSpecToGui(container, "supportOcclusionQuery", engine.getCaps().supportOcclusionQuery);
        addSpecToGui(container, "supportSRGBBuffers", engine.getCaps().supportSRGBBuffers);
        addSpecToGui(container, "supportTransformFeedbacks", engine.getCaps().supportTransformFeedbacks);
        addSpecToGui(container, "textureAnisotropicFilterExtension", engine.getCaps().textureAnisotropicFilterExtension);
        addSpecToGui(container, "textureFloat", engine.getCaps().textureFloat);
        addSpecToGui(container, "textureFloatLinearFiltering", engine.getCaps().textureFloatLinearFiltering);
        addSpecToGui(container, "textureFloatRender", engine.getCaps().textureFloatRender);
        addSpecToGui(container, "textureHalfFloat", engine.getCaps().textureHalfFloat);
        addSpecToGui(container, "textureHalfFloatLinearFiltering", engine.getCaps().textureHalfFloatLinearFiltering);
        addSpecToGui(container, "textureHalfFloatRender", engine.getCaps().textureHalfFloatRender);
        addSpecToGui(container, "textureLOD", engine.getCaps().textureLOD);
        addSpecToGui(container, "textureMaxLevel", engine.getCaps().textureMaxLevel);
        addSpecToGui(container, "timerQuery", engine.getCaps().timerQuery);
        addSpecToGui(container, "uintIndices", engine.getCaps().uintIndices);
        addSpecToGui(container, "vertexArrayObject", engine.getCaps().vertexArrayObject);
    }

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
                        // console.log(element.assets.en.title , " no cover");
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
        await advancedTexture.parseFromURLAsync("./Layouts/guiTexture.json");
        advancedTexture.idealWidth = 1920;

        // look for every necessary Control
        const navbar = advancedTexture.getControlByName("StackPanel");
        const btnHome = advancedTexture.getControlByName("Nav_Home");
        const btn1 = advancedTexture.getControlByName("Nav_Btn1");
        const btn2 = advancedTexture.getControlByName("Nav_Btn2");
        const display_zone = advancedTexture.getControlByName("DisplayZone");


        const navcaps = advancedTexture.getControlByName("InspectorEngineNavigatorStack");

        if (navcaps != null) {
            advancedTexture.getControlByName("InspectorScrollview").freezeControls = false;
            addSpecsToGui(navcaps);
            advancedTexture.getControlByName("InspectorScrollview").freezeControls = true;
        } else {
            console.log("no inspector");
        }

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
                if (display_zone) {
                    display_zone.freezeControls = false;
                    let children = display_zone.getDescendants();
                    children.forEach(child => {
                        child.dispose();
                    });
                    populateView(display_zone);
                    display_zone.freezeControls = true;
                }
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