import * as THREE from 'three';

export default class Moon {
    scene: THREE.Scene
    mesh: THREE.Mesh;
    constructor(scene: THREE.Scene) {
        this.scene = scene;

        this.load();
    }

    load() {

        const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg');
        const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg');

        const moon = new THREE.Mesh(
            new THREE.SphereGeometry(3, 32, 32),
            new THREE.MeshStandardMaterial(
                { map: moonTexture, normalMap: normalTexture }
            )
        );
        this.scene.add(moon);

        moon.position.z = 15;
        moon.position.x = -10;

        this.mesh = moon;
    }
}