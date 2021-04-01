import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import App from './app.js';
import AmbientLight from './lights/ambientLight';
import DirectionalLight from './lights/directionalLight';
import PointLight from './lights/pointLight';
import Texture from './materials/texture';
import Ground from './objects/planeGeometry/ground';
import Door from './objects/planeGeometry/door';
import CentralPyramid from './objects/coneGeometry/centralPyramid';

// create app
const app = new App();

// add fog
const fog = new THREE.Fog('#1c5fc4', 1, 15);
app.scene.fog = fog;

// setup data gui
const gui = new dat.GUI();
gui.width = 400;

// get textures
const texture = new Texture();

const ground = new Ground();
app.scene.add(ground.ground);

gui.add(ground.ground.rotation, 'x')
    .min(ground.groundRotX)
    .max(2)
    .step(0.001)
    .name('ground rotX');

const pyramid = new CentralPyramid();
app.scene.add(pyramid.pyramid);

const pyramidSmallLeftCorner = new THREE.Mesh(
    pyramid.geometryPyramid,
    pyramid.materialPyramid,
);

pyramidSmallLeftCorner.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(
        pyramidSmallLeftCorner.geometry.attributes.uv.array,
        2,
    ),
);

pyramidSmallLeftCorner.position.set(-16, 3.5, 3);
pyramidSmallLeftCorner.rotation.y = Math.PI;
app.scene.add(pyramidSmallLeftCorner);

const pyramidSmallRightCornerNear = new THREE.Mesh(
    pyramid.geometryPyramid,
    pyramid.materialPyramid,
);

pyramidSmallRightCornerNear.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(
        pyramidSmallRightCornerNear.geometry.attributes.uv.array,
        2,
    ),
);

pyramidSmallRightCornerNear.position.set(8, 3.5, 12);
pyramidSmallRightCornerNear.rotation.y = Math.PI * 0.5;
app.scene.add(pyramidSmallRightCornerNear);

const pyramidSmallRightCornerFar = new THREE.Mesh(
    pyramid.geometryPyramid,
    pyramid.materialPyramid,
);

pyramidSmallRightCornerFar.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(
        pyramidSmallRightCornerFar.geometry.attributes.uv.array,
        2,
    ),
);

pyramidSmallRightCornerFar.position.set(15, 2.1, -1);
pyramidSmallRightCornerFar.rotation.y = Math.PI;
pyramidSmallRightCornerFar.scale.set(0.5, 0.5, 0.5);
app.scene.add(pyramidSmallRightCornerFar);

const door = new Door();
app.scene.add(door.door);

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
const pointLightOne = new PointLight('#1343c9', 1, 5, 0, 4, 3);
const pointLightTwo = new PointLight('#1343c9', 1, 5, -3, 1.5, 1.5);
const pointLightThree = new PointLight('#1343c9', 1, 5, 3, 1.5, 1.5);
const pointLightFour = new PointLight('#1343c9', 1, 5, 0, 1.5, -3);

app.scene.add(
    pointLightOne.light,
    pointLightTwo.light,
    pointLightThree.light,
    pointLightFour.light,
);

// create group of big pyramid
const bigPyramid = new THREE.Group();
bigPyramid.add(
    pyramid.pyramid,
    door.door,
    pointLightOne.light,
    pointLightTwo.light,
    pointLightThree.light,
    pointLightFour.light,
);
app.scene.add(bigPyramid);

// create additional lights
const flyLightOne = new PointLight('#1c5fc4', 3, 5);
flyLightOne.lightPosition;
app.scene.add(flyLightOne.light);

const flyLightTwo = new PointLight('#1c5fc4', 2, 3);
flyLightTwo.lightPosition;
app.scene.add(flyLightTwo.light);

const flyLightThree = new PointLight('#1c5fc4', 4, 8);
flyLightThree.lightPosition;
app.scene.add(flyLightThree.light);

// create sphere objects
const spheres = new THREE.Group();
app.scene.add(spheres);

const geometrySphere = new THREE.SphereGeometry(0.5, 64, 64);
const materialSphere = new THREE.MeshStandardMaterial({
    map: texture.sphereBaseTexture,
    aoMap: texture.sphereAmbientTexture,
    transparent: true,
    displacementMap: texture.sphereHeightTexture,
    normalMap: texture.sphereNormalTexture,
    roughnessMap: texture.sphereRoughnessTexture,
    displacementScale: 3,
    metalnessMap: texture.sphereMentalnessTexture,
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

const spherePointLight = new PointLight('#ec1111', 5, 10);
spherePointLight.light.position.y = 1;
spherePointLight.light.position.x = 0;
spherePointLight.light.position.z = 0;
gui.add(spherePointLight.light.position, 'y')
    .min(0)
    .max(2)
    .step(0.001)
    .name('sphere light posY');
gui.add(spherePointLight.light.position, 'x')
    .min(0)
    .max(5)
    .step(0.001)
    .name('sphere light posX');
gui.add(spherePointLight.light.position, 'z')
    .min(0)
    .max(5)
    .step(0.001)
    .name('sphere light posZ');
spheres.add(spherePointLight.light);

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
directionalLight.light.castShadow = true;
ambientLight.light.castShadow = true;
spherePointLight.light.castShadow = true;

flyLightOne.light.castShadow = true;
flyLightOne.light.shadow.mapSize.width = 256;
flyLightOne.light.shadow.mapSize.height = 256;
flyLightOne.light.shadow.camera.far = 7;

flyLightTwo.light.castShadow = true;
flyLightTwo.light.shadow.mapSize.width = 256;
flyLightTwo.light.shadow.mapSize.height = 256;
flyLightTwo.light.shadow.camera.far = 7;

flyLightThree.light.castShadow = true;
flyLightThree.light.shadow.mapSize.width = 256;
flyLightThree.light.shadow.mapSize.height = 256;
flyLightThree.light.shadow.camera.far = 7;

bigPyramid.castShadow = true;
pyramidSmallLeftCorner.castShadow = true;
pyramidSmallRightCornerFar.castShadow = true;
pyramidSmallRightCornerNear.castShadow = true;
ground.ground.receiveShadow = true;

// Get time from Three.js
const clock = new THREE.Clock();

// Run animation
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    bigPyramid.position.y = Math.sin(elapsedTime * 0.1) + 1;
    const time = elapsedTime * 0.5;
    const timeTwo = -elapsedTime * 0.2;

    flyLightOne.light.position.x = Math.cos(time) * 4;
    flyLightOne.light.position.z = Math.sin(time) * 8;
    flyLightOne.light.position.y = Math.sin(time) * 4;

    flyLightTwo.light.position.x = -Math.cos(timeTwo) * 7;
    flyLightTwo.light.position.z = Math.sin(timeTwo) * 2;
    flyLightTwo.light.position.y = Math.sin(time) * 5 + Math.sin(time) * 2.5;

    flyLightThree.light.position.x = Math.cos(time) * 6;
    flyLightThree.light.position.z = -Math.sin(time) * 2;
    flyLightThree.light.position.y = -Math.cos(time) * 5;

    spheres.rotation.y = elapsedTime * 0.1;
    controls.update();
    renderer.render(app.scene, camera);
    window.requestAnimationFrame(animate);
};

animate();
