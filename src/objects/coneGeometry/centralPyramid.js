import * as THREE from 'three';
import MaterialBricksTexture from '../../materials/materialBricksTexture';

class CentralPyramid {
    constructor() {
        this.materialBricksTexture = new MaterialBricksTexture();
        this.geometryPyramid = new THREE.ConeGeometry(5, 5, 3);
        this.materialPyramid = new THREE.MeshStandardMaterial({
            ...this.materialBricksTexture.material,
        });

        this.pyramid = new THREE.Mesh(
            this.geometryPyramid,
            this.materialPyramid,
        );

        this.pyramid.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(
                this.pyramid.geometry.attributes.uv.array,
                2,
            ),
        );

        this.pyramid.position.y = 3.8;
        this.pyramid.rotation.y = Math.PI;
    }
}

export default CentralPyramid;
