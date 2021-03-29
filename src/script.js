import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// create scene
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

// add fog
const fog = new THREE.Fog('#1c5fc4', 1, 15);
scene.fog = fog;

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
const bricksAmbientTexture = texture.load(
    '/textures/bricks/ambientOcclusion.jpg',
);
const bricksBaseTexture = texture.load('/textures/bricks/color.jpg');
const bricksHeightTexture = texture.load('/textures/bricks/height.jpg');
const bricksNormalTexture = texture.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = texture.load('/textures/bricks/roughness.jpg');
const doorAmbientTexture = texture.load('/textures/door/ambientOcclusion.jpg');
const doorBaseTexture = texture.load('/textures/door/color.jpg');
const doorNormalTexture = texture.load('/textures/door/normal.jpg');
const doorRoughnessTexture = texture.load('/textures/door/roughness.jpg');
const doorHeightTexture = texture.load('/textures/door/height.jpg');
const doorMentalnessTexture = texture.load('/textures/door/metalness.jpg');
const doorAlphaTexture = texture.load('/textures/door/alpha.jpg');
const sphereAmbientTexture = texture.load(
    '/textures/metal/ambientOcclusion2.jpg',
);
const sphereBaseTexture = texture.load('/textures/metal/color2.jpg');
const sphereNormalTexture = texture.load('/textures/metal/normal2.jpg');
const sphereRoughnessTexture = texture.load('/textures/metal/roughness2.jpg');
const sphereHeightTexture = texture.load('/textures/metal/height2.jpg');
const sphereMentalnessTexture = texture.load('/textures/metal/metalness2.jpg');

// create flat ground under scene
const geometryPlane = new THREE.PlaneGeometry(40, 40);
const materialPlane = new THREE.MeshStandardMaterial({
    map: bricksBaseTexture,
    aoMap: bricksAmbientTexture,
    transparent: true,
    displacementMap: bricksHeightTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    side: THREE.DoubleSide,
});

bricksBaseTexture.repeat.set(24, 16);
bricksAmbientTexture.repeat.set(24, 16);
bricksNormalTexture.repeat.set(24, 16);
bricksRoughnessTexture.repeat.set(24, 16);
bricksHeightTexture.repeat.set(24, 16);

bricksBaseTexture.wrapS = THREE.RepeatWrapping;
bricksAmbientTexture.wrapS = THREE.RepeatWrapping;
bricksNormalTexture.wrapS = THREE.RepeatWrapping;
bricksRoughnessTexture.wrapS = THREE.RepeatWrapping;
bricksHeightTexture.wrapS = THREE.RepeatWrapping;

bricksBaseTexture.wrapT = THREE.RepeatWrapping;
bricksAmbientTexture.wrapT = THREE.RepeatWrapping;
bricksNormalTexture.wrapT = THREE.RepeatWrapping;
bricksRoughnessTexture.wrapT = THREE.RepeatWrapping;
bricksHeightTexture.wrapT = THREE.RepeatWrapping;

const ground = new THREE.Mesh(geometryPlane, materialPlane);
ground.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(ground.geometry.attributes.uv.array, 2),
);
const groundRotX = -Math.PI * 0.5;
ground.rotation.x = groundRotX;
ground.position.y = 1;
scene.add(ground);

gui.add(ground.rotation, 'x')
    .min(groundRotX)
    .max(2)
    .step(0.001)
    .name('ground rotX');

// create pyramid
const geometryPyramid = new THREE.ConeGeometry(5, 5, 3);
const materialPyramid = new THREE.MeshStandardMaterial({
    map: bricksBaseTexture,
    aoMap: bricksAmbientTexture,
    transparent: true,
    displacementMap: bricksHeightTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
    side: THREE.DoubleSide,
});

const pyramid = new THREE.Mesh(geometryPyramid, materialPyramid);
pyramid.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(pyramid.geometry.attributes.uv.array, 2),
);
pyramid.position.y = 3.8;
pyramid.rotation.y = Math.PI;
scene.add(pyramid);

const pyramidSmallLeftCorner = new THREE.Mesh(geometryPyramid, materialPyramid);
pyramidSmallLeftCorner.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(
        pyramidSmallLeftCorner.geometry.attributes.uv.array,
        2,
    ),
);

pyramidSmallLeftCorner.position.y = 3.5;
pyramidSmallLeftCorner.position.x = -16;
pyramidSmallLeftCorner.position.z = 3;
pyramidSmallLeftCorner.rotation.y = Math.PI;
scene.add(pyramidSmallLeftCorner);

const pyramidSmallRightCornerNear = new THREE.Mesh(
    geometryPyramid,
    materialPyramid,
);

pyramidSmallRightCornerNear.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(
        pyramidSmallRightCornerNear.geometry.attributes.uv.array,
        2,
    ),
);

pyramidSmallRightCornerNear.position.y = 3.5;
pyramidSmallRightCornerNear.position.x = 8;
pyramidSmallRightCornerNear.position.z = 12;
pyramidSmallRightCornerNear.rotation.y = Math.PI * 0.5;
scene.add(pyramidSmallRightCornerNear);

const pyramidSmallRightCornerFar = new THREE.Mesh(
    geometryPyramid,
    materialPyramid,
);

pyramidSmallRightCornerFar.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(
        pyramidSmallRightCornerFar.geometry.attributes.uv.array,
        2,
    ),
);
pyramidSmallRightCornerFar.position.y = 2.1;
pyramidSmallRightCornerFar.position.x = 15;
pyramidSmallRightCornerFar.rotation.y = Math.PI;
pyramidSmallRightCornerFar.position.z = -1;
pyramidSmallRightCornerFar.scale.set(0.5, 0.5, 0.5);
scene.add(pyramidSmallRightCornerFar);

//create door to the piramid

const geometryDoor = new THREE.PlaneGeometry(1.1, 1.3);
const materialDoor = new THREE.MeshStandardMaterial({
    map: doorBaseTexture,
    aoMap: doorAmbientTexture,
    transparent: true,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
    side: THREE.DoubleSide,
    //alphaMap: doorAlphaTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.3,
    metalnessMap: doorMentalnessTexture,
});
const door = new THREE.Mesh(geometryDoor, materialDoor);
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2),
);
door.position.z = 2.21;
door.position.y = 1.9;
door.rotation.x = -0.455;
door.position.x = 0;
scene.add(door);

// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.2);
gui.add(ambientLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('ambient light intensity');
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#b9d5ff', 0.2);
directionalLight.position.set(4, 5, -2);
gui.add(directionalLight.position, 'x')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('directional light posX');
gui.add(directionalLight.position, 'y')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('directional light posY');
gui.add(directionalLight.position, 'z')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('directional light posZ');
gui.add(directionalLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('directional light intensity');
scene.add(directionalLight);

// Point light
const pointLight = new THREE.PointLight('#1343c9', 1, 5);
pointLight.position.set(0, 4, 3);
scene.add(pointLight);

const pointLightLeftCorner = new THREE.PointLight('#1343c9', 1, 5);
pointLightLeftCorner.position.set(-3, 1.5, 1.5);
scene.add(pointLightLeftCorner);

const pointLightRightCorner = new THREE.PointLight('#1343c9', 1, 5);
pointLightRightCorner.position.set(3, 1.5, 1.5);
scene.add(pointLightRightCorner);

const pointLightBackCorner = new THREE.PointLight('#1343c9', 1, 5);
pointLightBackCorner.position.set(0, 1.5, -3);
scene.add(pointLightBackCorner);

// create group of big pyramid
const bigPyramid = new THREE.Group();
bigPyramid.add(
    pyramid,
    door,
    pointLight,
    pointLightRightCorner,
    pointLightBackCorner,
    pointLightLeftCorner,
);
scene.add(bigPyramid);

// create additional lights
const flyLightOne = new THREE.PointLight('#1c5fc4', 3, 5);
scene.add(flyLightOne);
const flyLightTwo = new THREE.PointLight('#1c5fc4', 2, 3);
scene.add(flyLightTwo);
const flyLightThree = new THREE.PointLight('#1c5fc4', 4, 8);
scene.add(flyLightThree);

// create sphere objects
const spheres = new THREE.Group();
scene.add(spheres);

const geometrySphere = new THREE.SphereGeometry(0.5, 64, 64);
const materialSphere = new THREE.MeshStandardMaterial({
    map: sphereBaseTexture,
    aoMap: sphereAmbientTexture,
    transparent: true,
    displacementMap: sphereHeightTexture,
    normalMap: sphereNormalTexture,
    roughnessMap: sphereRoughnessTexture,
    displacementScale: 3,
    metalnessMap: sphereMentalnessTexture,
});

for (let i = 0; i < 20; i++) {
    const angleOfSphere = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 10;
    const posX = Math.sin(angleOfSphere) * radius;
    const posZ = Math.cos(angleOfSphere) * radius;
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(
            sphere.geometry.attributes.uv.array,
            2,
        ),
    );

    spheres.add(sphere);
    sphere.position.set(posX, 1.5, posZ);
}

const spherePointLight = new THREE.PointLight('#ec1111', 5, 10);
spherePointLight.position.y = 1;
spheres.add(spherePointLight);
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

camera.position.x = 0;
camera.position.y = 4.8;
camera.position.z = 12.8;
scene.add(camera);

gui.add(camera.position, 'x').min(0.1).max(10).step(0.1).name('camera posX');
gui.add(camera.position, 'y').min(1.2).max(10).step(0.1).name('camera posY');
gui.add(camera.position, 'z').min(0.1).max(20).step(0.1).name('camera posZ');

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
renderer.setClearColor('#1c5fc4');

// Get time from Three.js
const clock = new THREE.Clock();

// Run animation
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    bigPyramid.position.y = Math.sin(elapsedTime * 0.1) + 1;
    const time = elapsedTime * 0.5;
    const timeTwo = -elapsedTime * 0.2;
    flyLightOne.position.x = Math.cos(time) * 4;
    flyLightOne.position.z = Math.sin(time) * 8;
    flyLightOne.position.y = Math.sin(time) * 4;

    flyLightTwo.position.x = -Math.cos(timeTwo) * 7;
    flyLightTwo.position.z = Math.sin(timeTwo) * 2;
    flyLightTwo.position.y = Math.sin(time) * 5 + Math.sin(time) * 2.5;

    flyLightThree.position.x = Math.cos(time) * 6;
    flyLightThree.position.z = -Math.sin(time) * 2;
    flyLightThree.position.y = -Math.cos(time) * 5;

    spheres.rotation.y = elapsedTime * 0.1;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
