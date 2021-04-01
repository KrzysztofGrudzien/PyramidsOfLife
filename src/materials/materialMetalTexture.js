import Texture from './textures';

class MaterialMetalTexture {
    constructor() {
        this.texture = new Texture();
        this.material = {
            map: this.texture.sphereBaseTexture,
            aoMap: this.texture.sphereAmbientTexture,
            transparent: true,
            displacementMap: this.texture.sphereHeightTexture,
            normalMap: this.texture.sphereNormalTexture,
            roughnessMap: this.texture.sphereRoughnessTexture,
            displacementScale: 3,
            metalnessMap: this.texture.sphereMentalnessTexture,
        };
    }
}

export default MaterialMetalTexture;
