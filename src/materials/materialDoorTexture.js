import * as THREE from 'three';
import Texture from './textures';

class MaterialDoorTexture {
    constructor() {
        this.texture = new Texture();
        this.material = {
            map: this.texture.doorBaseTexture,
            aoMap: this.texture.doorAmbientTexture,
            transparent: true,
            normalMap: this.texture.doorNormalTexture,
            roughnessMap: this.texture.doorRoughnessTexture,
            side: THREE.DoubleSide,
            displacementMap: this.texture.doorHeightTexture,
            displacementScale: 0.3,
            metalnessMap: this.texture.doorMentalnessTexture,
        };
    }
}

export default MaterialDoorTexture;
