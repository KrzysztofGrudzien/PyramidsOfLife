import * as THREE from 'three';
import MaterialMetalTexture from '../../materials/materialMetalTexture';

class Sphere {
    constructor() {
        this.materialMetalTexture = new MaterialMetalTexture();
        this.geometrySphere = new THREE.SphereGeometry(0.5, 64, 64);
        this.materialSphere = new THREE.MeshStandardMaterial({
            ...this.materialMetalTexture.material,
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
