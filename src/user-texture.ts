import * as THREE from "three";

export default class UserTexture {
    scene: THREE.Scene;
    mesh: THREE.Mesh;

    constructor(scene: THREE.Scene) {
        this.scene = scene;

        this.load();
    }

    load() {
        const userTexture = new THREE.TextureLoader().load('assets/block.jpg');

        const jeff = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshBasicMaterial({ map: userTexture })
        );

        this.scene.add(jeff);

        this.mesh = jeff;
    }
}