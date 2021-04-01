import * as THREE from 'three';
import MaterialBricksTexture from '../../materials/materialBricksTexture';

class Ground {
    constructor() {
        this.materialBricksTexture = new MaterialBricksTexture();
        this.geometryPlane = new THREE.PlaneGeometry(40, 40);
        this.materialPlane = new THREE.MeshStandardMaterial({
            ...this.materialBricksTexture.material,
        });

        this.ground = new THREE.Mesh(this.geometryPlane, this.materialPlane);
        this.ground.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(
                this.ground.geometry.attributes.uv.array,
                2,
            ),
        );

        this.groundRotX = -Math.PI * 0.5;
        this.ground.rotation.x = this.groundRotX;
        this.ground.position.y = 1;
    }
}

export default Ground;
