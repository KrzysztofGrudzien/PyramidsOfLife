import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import App from './app.js';
import AmbientLight from './lights/ambientLight';
import DirectionalLight from './lights/directionalLight';
import PointLight from './lights/pointLight';
import Texture from './materials/texture';

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

// create flat ground under scene
const geometryPlane = new THREE.PlaneGeometry(40, 40);
const materialPlane = new THREE.MeshStandardMaterial({
    map: texture.bricksBaseTexture,
    aoMap: texture.bricksAmbientTexture,
    transparent: true,
    displacementMap: texture.bricksHeightTexture,
    normalMap: texture.bricksNormalTexture,
    roughnessMap: texture.bricksRoughnessTexture,
    side: THREE.DoubleSide,
});

texture.bricksBaseTexture.repeat.set(24, 16);
texture.bricksAmbientTexture.repeat.set(24, 16);
texture.bricksNormalTexture.repeat.set(24, 16);
texture.bricksRoughnessTexture.repeat.set(24, 16);
texture.bricksHeightTexture.repeat.set(24, 16);

texture.bricksBaseTexture.wrapS = THREE.RepeatWrapping;
texture.bricksAmbientTexture.wrapS = THREE.RepeatWrapping;
texture.bricksNormalTexture.wrapS = THREE.RepeatWrapping;
texture.bricksRoughnessTexture.wrapS = THREE.RepeatWrapping;
texture.bricksHeightTexture.wrapS = THREE.RepeatWrapping;

texture.bricksBaseTexture.wrapT = THREE.RepeatWrapping;
texture.bricksAmbientTexture.wrapT = THREE.RepeatWrapping;
texture.bricksNormalTexture.wrapT = THREE.RepeatWrapping;
texture.bricksRoughnessTexture.wrapT = THREE.RepeatWrapping;
texture.bricksHeightTexture.wrapT = THREE.RepeatWrapping;

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
    map: texture.bricksBaseTexture,
    aoMap: texture.bricksAmbientTexture,
    transparent: true,
    displacementMap: texture.bricksHeightTexture,
    normalMap: texture.bricksNormalTexture,
    roughnessMap: texture.bricksRoughnessTexture,
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
    map: texture.doorBaseTexture,
    aoMap: texture.doorAmbientTexture,
    transparent: true,
    normalMap: texture.doorNormalTexture,
    roughnessMap: texture.doorRoughnessTexture,
    side: THREE.DoubleSide,
    displacementMap: texture.doorHeightTexture,
    displacementScale: 0.3,
    metalnessMap: texture.doorMentalnessTexture,
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
    pyramid,
    door,
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
directionalLight.castShadow = true;
ambientLight.castShadow = true;
spherePointLight.castShadow = true;

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
ground.receiveShadow = true;

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
