import * as THREE from 'three';
import Texture from '../../materials/texture';

class Sphere {
    constructor() {
        this.texture = new Texture();
        this.geometrySphere = new THREE.SphereGeometry(0.5, 64, 64);
        this.materialSphere = new THREE.MeshStandardMaterial({
            map: this.texture.sphereBaseTexture,
            aoMap: this.texture.sphereAmbientTexture,
            transparent: true,
            displacementMap: this.texture.sphereHeightTexture,
            normalMap: this.texture.sphereNormalTexture,
            roughnessMap: this.texture.sphereRoughnessTexture,
            displacementScale: 3,
            metalnessMap: this.texture.sphereMentalnessTexture,
        });
        this.sphere = new THREE.Mesh(this.geometrySphere, this.materialSphere);
        this.sphere.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(
                this.sphere.geometry.attributes.uv.array,
                2,
            ),
        );
    }
}

export default Sphere;
