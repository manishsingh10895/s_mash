import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import UserTexture from './user-texture';
import Moon from './moon';

export function run() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg') as HTMLCanvasElement
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });

    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    const pointLight = new THREE.PointLight(0xffffff);

    const ambientLight = new THREE.AmbientLight(0xffffff);

    pointLight.position.set(5, 5, 5);

    scene.add(pointLight, ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);

    scene.add(lightHelper);
    scene.add(gridHelper);

    // const controls = new OrbitControls(camera, renderer.domElement);


    function addStar() {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x, y, z);
        scene.add(star);
    }


    function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        torus.rotation.z += 0.01;

        // controls.update();

        renderer.render(scene, camera);
    }

    Array(200).fill(0).forEach(addStar);

    const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
    scene.background = spaceTexture;

    const user = new UserTexture(scene).mesh;
    const moon = new Moon(scene).mesh;

    function moveCamera() {
        const t = document.body.getBoundingClientRect().top;
        var s = t > 0 ? 1 : -1;
        moon.rotation.x += s * 0.05;
        moon.rotation.y += s * 0.075;
        moon.rotation.z += s * 0.05;

        user.rotation.y += 0.01;
        user.rotation.z += 0.01;

        camera.position.z = t * -0.01;
        camera.position.x = t * -0.0002;
        camera.rotation.y = t * -0.0002;
    }

    document.body.onscroll = moveCamera;

    animate();
}
