import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Create cube model for test
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
    100,
);
camera.position.z = 3;
scene.add(camera);

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
