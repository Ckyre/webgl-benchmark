setObjCountText(OBJ_COUNT);
startFPSCount();


function main() {
    // This creates a basic Babylon Scene object (non-mesh)
    const canvas = document.querySelector('canvas');
    const engine = new BABYLON.Engine(canvas, false);
    const images = [];

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
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
        await advancedTexture.parseFromURLAsync("./guiTexture.json");
        advancedTexture.idealWidth = 1920;

        // look for every necessary Control
        const navbar = advancedTexture.getControlByName("StackPanel");
        const btnHome = advancedTexture.getControlByName("Nav_Home");
        const btn1 = advancedTexture.getControlByName("Nav_Btn1");
        const btn2 = advancedTexture.getControlByName("Nav_Btn2");
        const display_zone = advancedTexture.getControlByName("DisplayZone");

        // var checkbox = new BABYLON.GUI.Checkbox();
        // checkbox.width = "20px";
        // checkbox.height = "20px";
        // checkbox.isChecked = false;
        // checkbox.color = "green";
        // checkbox.onIsCheckedChangedObservable.add(function(value) {
        //     display_zone.freezeControls = value;
        //     setbuckets.isEnabled = value;
        // });
        // navbar.addControl(checkbox);

        // setbuckets = new BABYLON.GUI.Checkbox();
        // setbuckets.width = "20px";
        // setbuckets.height = "20px";
        // setbuckets.isChecked = false;
        // setbuckets.isEnabled = false;
        // setbuckets.color = "green";
        // setbuckets.onIsCheckedChangedObservable.add(function(value) {
        //     display_zone.setBucketSizes(value ? 500 : 0, value ? 200 : 0);
        // });
        // navbar.addControl(setbuckets);

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
        stats.color = "white";
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
                    let children = display_zone.getDescendants();
                    children.forEach(child => {
                        child.dispose();
                    });
                }
                populateView(display_zone);
                display_zone.freezeControls = true;
            });
        }

        scene.onBeforeRenderObservable.add(() => advancedTexture.markAsDirty()); // make sure the GUI is redrawn continously

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
        sceneToRender.render();
    });
}

main();