setObjCountText(OBJ_COUNT);
startFPSCount();

import * as THREE from './three.module.js';

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0, 2000);
    camera.position.z = 1000;

    const scene = new THREE.Scene();

    const loader = new THREE.TextureLoader();

    const textures = [
        loader.load('https://picsum.photos/1920/1080'),
        loader.load('https://picsum.photos/800/600'),
    ];


    for (let i = 0; i < OBJ_COUNT; i += 1) {
        const w = randomInt(OBJ_MAX_SIZE);
        const h = randomInt(OBJ_MAX_SIZE);
        const l = randomInt(900) - window.innerWidth / 2 + w;
        const t = randomInt(500) - window.innerHeight / 2 + h;

        const geometry = new THREE.PlaneGeometry(w, h, 1, 1);

        const material =
            new THREE.MeshBasicMaterial(OBJ_TEXTURED ? ({ map: textures[randomInt(textures.length)], side: THREE.DoubleSide, }) : { color: randomColor() });

        const rect = new THREE.Mesh(geometry, material);
        rect.position.x = l;
        rect.position.y = t;

        scene.add(rect);
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();