import * as THREE from 'three';

class Texture {
    constructor() {
        this.loadingManager = new THREE.LoadingManager();
        this.texture = new THREE.TextureLoader(this.loadingManager);
        this.loadingManager.onStart = () => {
            console.log('start loading');
        };

        this.loadingManager.onLoad = () => {
            console.log('loaded');
        };

        this.loadingManager.onProgress = () => {
            console.log('progress loading');
        };

        this.bricksAmbientTexture = this.texture.load(
            '/textures/bricks/ambientOcclusion.jpg',
        );
        this.bricksBaseTexture = this.texture.load(
            '/textures/bricks/color.jpg',
        );
        this.bricksHeightTexture = this.texture.load(
            '/textures/bricks/height.jpg',
        );
        this.bricksNormalTexture = this.texture.load(
            '/textures/bricks/normal.jpg',
        );
        this.bricksRoughnessTexture = this.texture.load(
            '/textures/bricks/roughness.jpg',
        );
        this.doorAmbientTexture = this.texture.load(
            '/textures/door/ambientOcclusion.jpg',
        );
        this.doorBaseTexture = this.texture.load('/textures/door/color.jpg');
        this.doorNormalTexture = this.texture.load('/textures/door/normal.jpg');
        this.doorRoughnessTexture = this.texture.load(
            '/textures/door/roughness.jpg',
        );
        this.doorHeightTexture = this.texture.load('/textures/door/height.jpg');
        this.doorMentalnessTexture = this.texture.load(
            '/textures/door/metalness.jpg',
        );
        this.sphereAmbientTexture = this.texture.load(
            '/textures/metal/ambientOcclusion2.jpg',
        );
        this.sphereBaseTexture = this.texture.load(
            '/textures/metal/color2.jpg',
        );
        this.sphereNormalTexture = this.texture.load(
            '/textures/metal/normal2.jpg',
        );
        this.sphereRoughnessTexture = this.texture.load(
            '/textures/metal/roughness2.jpg',
        );
        this.sphereHeightTexture = this.texture.load(
            '/textures/metal/height2.jpg',
        );
        this.sphereMentalnessTexture = this.texture.load(
            '/textures/metal/metallic2.jpg',
        );
    }
}

export default Texture;
