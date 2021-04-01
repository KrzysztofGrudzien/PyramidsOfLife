import Texture from './textures';
import * as THREE from 'three';

class MaterialBricksTexture {
    constructor() {
        this.texture = new Texture();
        this.material = {
            map: this.texture.bricksBaseTexture,
            aoMap: this.texture.bricksAmbientTexture,
            transparent: true,
            displacementMap: this.texture.bricksHeightTexture,
            normalMap: this.texture.bricksNormalTexture,
            roughnessMap: this.texture.bricksRoughnessTexture,
            side: THREE.DoubleSide,
        };

        this.texture.bricksBaseTexture.repeat.set(24, 16);
        this.texture.bricksAmbientTexture.repeat.set(24, 16);
        this.texture.bricksNormalTexture.repeat.set(24, 16);
        this.texture.bricksRoughnessTexture.repeat.set(24, 16);
        this.texture.bricksHeightTexture.repeat.set(24, 16);

        this.texture.bricksBaseTexture.wrapS = THREE.RepeatWrapping;
        this.texture.bricksAmbientTexture.wrapS = THREE.RepeatWrapping;
        this.texture.bricksNormalTexture.wrapS = THREE.RepeatWrapping;
        this.texture.bricksRoughnessTexture.wrapS = THREE.RepeatWrapping;
        this.texture.bricksHeightTexture.wrapS = THREE.RepeatWrapping;

        this.texture.bricksBaseTexture.wrapT = THREE.RepeatWrapping;
        this.texture.bricksAmbientTexture.wrapT = THREE.RepeatWrapping;
        this.texture.bricksNormalTexture.wrapT = THREE.RepeatWrapping;
        this.texture.bricksRoughnessTexture.wrapT = THREE.RepeatWrapping;
        this.texture.bricksHeightTexture.wrapT = THREE.RepeatWrapping;
    }
}

export default MaterialBricksTexture;
