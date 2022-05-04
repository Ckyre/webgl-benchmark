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

    for (let i = 0; i < OBJ_COUNT; i += 1) {
        const w = randomInt(OBJ_MAX_SIZE);
        const h = randomInt(OBJ_MAX_SIZE);

        const geometry = new THREE.PlaneGeometry(w, h, 1, 1);

        const material = new THREE.MeshBasicMaterial({ color: randomColor() });

        const rect = new THREE.Mesh(geometry, material);
        rect.position.x = randomInt(900) - window.innerWidth / 2 + w;
        rect.position.y = randomInt(500) - window.innerHeight / 2 + h;

        scene.add(rect);
    }

    renderer.render(scene, camera);
}

main();