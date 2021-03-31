import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import App from './app.js';
import AmbientLight from './lights/ambientLight';
import DirectionalLight from './lights/directionalLight';

// create app
const app = new App();

// add fog
const fog = new THREE.Fog('#1c5fc4', 1, 15);
app.scene.fog = fog;

// setup data gui
const gui = new dat.GUI();
gui.width = 400;

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
const sphereAmbientTexture = texture.load(
    '/textures/metal/ambientOcclusion2.jpg',
);
const sphereBaseTexture = texture.load('/textures/metal/color2.jpg');
const sphereNormalTexture = texture.load('/textures/metal/normal2.jpg');
const sphereRoughnessTexture = texture.load('/textures/metal/roughness2.jpg');
const sphereHeightTexture = texture.load('/textures/metal/height2.jpg');
const sphereMentalnessTexture = texture.load('/textures/metal/metallic2.jpg');

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
//app.scene.add(ground);
app.scene.add(ground);

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
app.scene.add(pyramid);

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
app.scene.add(pyramidSmallLeftCorner);

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
app.scene.add(pyramidSmallRightCornerNear);

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
app.scene.add(pyramidSmallRightCornerFar);

//create door to the piramid

const geometryDoor = new THREE.PlaneGeometry(1.1, 1.3);
const materialDoor = new THREE.MeshStandardMaterial({
    map: doorBaseTexture,
    aoMap: doorAmbientTexture,
    transparent: true,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
    side: THREE.DoubleSide,
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
app.scene.add(door);

// Ambient light
const ambientLight = new AmbientLight('#b9d5ff', 0.4);
gui.add(ambientLight.light, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('ambient light intensity');
app.scene.add(ambientLight.light);

// Directional light
const directionalLight = new DirectionalLight('#b9d5ff', 0.2, 4, 5, -2);
gui.add(directionalLight.light.position, 'x')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('directional light posX');
gui.add(directionalLight.light.position, 'y')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('directional light posY');
gui.add(directionalLight.light.position, 'z')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('directional light posZ');
gui.add(directionalLight.light, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('directional light intensity');
app.scene.add(directionalLight.light);

// Point light
const pointLight = new THREE.PointLight('#1343c9', 1, 5);
pointLight.position.set(0, 4, 3);
app.scene.add(pointLight);

const pointLightLeftCorner = new THREE.PointLight('#1343c9', 1, 5);
pointLightLeftCorner.position.set(-3, 1.5, 1.5);
app.scene.add(pointLightLeftCorner);

const pointLightRightCorner = new THREE.PointLight('#1343c9', 1, 5);
pointLightRightCorner.position.set(3, 1.5, 1.5);
app.scene.add(pointLightRightCorner);

const pointLightBackCorner = new THREE.PointLight('#1343c9', 1, 5);
pointLightBackCorner.position.set(0, 1.5, -3);
app.scene.add(pointLightBackCorner);

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
app.scene.add(bigPyramid);

// create additional lights
const flyLightOne = new THREE.PointLight('#1c5fc4', 3, 5);
app.scene.add(flyLightOne);
const flyLightTwo = new THREE.PointLight('#1c5fc4', 2, 3);
app.scene.add(flyLightTwo);
const flyLightThree = new THREE.PointLight('#1c5fc4', 4, 8);
app.scene.add(flyLightThree);

// create sphere objects
const spheres = new THREE.Group();
app.scene.add(spheres);

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

    sphere.castShadow = true;
    spheres.add(sphere);
    sphere.position.set(posX, 1.5, posZ);
}

const spherePointLight = new THREE.PointLight('#ec1111', 5, 10);
spherePointLight.position.y = 1;
spheres.add(spherePointLight);

// Add resize function
app.resize();

// Add and remove fullscreen window
app.createFullScreen();

// Set up camera properties
const camera = app.camera;
app.setUpCameraPosition(0, 4.8, 12.5);
app.scene.add(camera);

gui.add(camera.position, 'x').min(0.1).max(10).step(0.1).name('camera posX');
gui.add(camera.position, 'y').min(1.2).max(10).step(0.1).name('camera posY');
gui.add(camera.position, 'z').min(0.1).max(20).step(0.1).name('camera posZ');

// Add orientation of camera
const controls = new OrbitControls(camera, app.canvas);
controls.enableDamping = true;

// Add renderer for app
app.rendererApp();
const renderer = app.renderer;

// add shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
directionalLight.castShadow = true;
ambientLight.castShadow = true;
spherePointLight.castShadow = true;

flyLightOne.castShadow = true;
flyLightOne.shadow.mapSize.width = 256;
flyLightOne.shadow.mapSize.height = 256;
flyLightOne.shadow.camera.far = 7;

flyLightTwo.castShadow = true;
flyLightTwo.shadow.mapSize.width = 256;
flyLightTwo.shadow.mapSize.height = 256;
flyLightTwo.shadow.camera.far = 7;

flyLightThree.castShadow = true;
flyLightThree.shadow.mapSize.width = 256;
flyLightThree.shadow.mapSize.height = 256;
flyLightThree.shadow.camera.far = 7;

bigPyramid.castShadow = true;
pyramidSmallLeftCorner.castShadow = true;
pyramidSmallRightCornerFar.castShadow = true;
pyramidSmallRightCornerNear.castShadow = true;
ground.receiveShadow = true;

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
    renderer.render(app.scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
