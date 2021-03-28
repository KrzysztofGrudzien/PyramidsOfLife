import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// create scene
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

// setup global window size
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// setup data gui
const gui = new dat.GUI();

// get textures

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('start loading');
};

loadingManager.onLoad = () => {
    console.log('loaded');
};

loadingManager.onProgress = () => {
    console.log('progress loading');
};

const texture = new THREE.TextureLoader(loadingManager);
const ambientTexture = texture.load(
    '/textures/Concrete_Blocks_007_ambientOcclusion.jpg',
);
const baseTexture = texture.load('/textures/Concrete_Blocks_007_basecolor.jpg');
const heightTexture = texture.load('/textures/Concrete_Blocks_007_height.jpg');
const normalTexture = texture.load('/textures/Concrete_Blocks_007_normal.jpg');
const roughnessTexture = texture.load(
    '/textures/Concrete_Blocks_007_roughness.jpg',
);
const doorAmbientTexture = texture.load('/textures/door/ambientOcclusion.jpg');
const doorBaseTexture = texture.load('/textures/door/color.jpg');
const doorNormalTexture = texture.load('/textures/door/normal.jpg');
const doorRoughnessTexture = texture.load('/textures/door/roughness.jpg');
const doorHeightTexture = texture.load('/textures/door/height.jpg');
const doorMentalnessTexture = texture.load('/textures/door/metalness.jpg');
const doorAlphaTexture = texture.load('/textures/door/alpha.jpg');

// create flat ground under scene
const geometryPlane = new THREE.PlaneGeometry(20, 20);
const materialPlane = new THREE.MeshBasicMaterial({
    color: '#72a852',
    side: THREE.DoubleSide,
});
const ground = new THREE.Mesh(geometryPlane, materialPlane);
const groundRotX = -Math.PI * 0.5;
ground.rotation.x = groundRotX;
ground.position.y = 1;
scene.add(ground);

gui.add(ground.rotation, 'x').min(groundRotX).max(2).step(0.001);

// create pyramid
const geometryPyramid = new THREE.ConeGeometry(5, 5, 3);
const materialPyramid = new THREE.MeshBasicMaterial({
    map: baseTexture,
    aoMap: ambientTexture,
    transparent: true,
    displacementMap: heightTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
});

baseTexture.repeat.set(32, 8);
ambientTexture.repeat.set(32, 8);
heightTexture.repeat.set(32, 8);
normalTexture.repeat.set(32, 8);
roughnessTexture.repeat.set(32, 8);

baseTexture.wrapS = THREE.RepeatWrapping;
ambientTexture.wrapS = THREE.RepeatWrapping;
heightTexture.wrapS = THREE.RepeatWrapping;
normalTexture.wrapS = THREE.RepeatWrapping;
roughnessTexture.wrapS = THREE.RepeatWrapping;

baseTexture.wrapT = THREE.RepeatWrapping;
ambientTexture.wrapT = THREE.RepeatWrapping;
heightTexture.wrapT = THREE.RepeatWrapping;
normalTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.wrapT = THREE.RepeatWrapping;

const pyramid = new THREE.Mesh(geometryPyramid, materialPyramid);
pyramid.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(pyramid.geometry.attributes.uv.array, 2),
);
pyramid.position.y = 3.8;
pyramid.rotation.y = Math.PI;
scene.add(pyramid);

//create door to the piramid

const geometryDoor = new THREE.PlaneGeometry(1.2, 1.8);
const materialDoor = new THREE.MeshBasicMaterial({
    map: doorBaseTexture,
    aoMap: doorAmbientTexture,
    transparent: true,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
    side: THREE.DoubleSide,
    alphaMap: doorAlphaTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    metalnessMap: doorMentalnessTexture,
});
const door = new THREE.Mesh(geometryDoor, materialDoor);
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2),
);
door.position.z = 2.08;
door.position.y = 2.2;
door.rotation.x = -0.45;
door.position.x = 0;
scene.add(door);

// Update scene properties when window size changes
window.addEventListener('resize', () => {
    // Update sizes
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    // Update camera properties
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    // Update renderer function
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Add and remove fullscreen window
window.addEventListener('dblclick', () => {
    const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

// Set up camera properties
const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    1000,
);

camera.position.x = 4;
camera.position.y = 3.5;
camera.position.z = 5;
scene.add(camera);

gui.add(camera.position, 'x').min(0.1).max(10).step(0.1);
gui.add(camera.position, 'y').min(1.2).max(10).step(0.1);
gui.add(camera.position, 'z').min(0.1).max(20).step(0.1);

// Add orientation of camera
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render Canvas object in Three.js
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

// Set up sizes and pixel ratio for window resolution
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Get time from Three.js
const clock = new THREE.Clock();

// Run animation
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
