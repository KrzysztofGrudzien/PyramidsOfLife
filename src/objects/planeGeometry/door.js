import * as THREE from 'three';
import MaterialDoorTexture from '../../materials/materialDoorTexture';

class Door {
    constructor() {
        this.materialDoorTexture = new MaterialDoorTexture();
        this.geometryDoor = new THREE.PlaneGeometry(1.1, 1.3);
        this.materialDoor = new THREE.MeshStandardMaterial({
            ...this.materialDoorTexture.material,
        });

        this.door = new THREE.Mesh(this.geometryDoor, this.materialDoor);
        this.door.geometry.setAttribute(
            'uv2',
            new THREE.Float32BufferAttribute(
                this.door.geometry.attributes.uv.array,
                2,
            ),
        );

        this.door.position.z = 2.21;
        this.door.position.y = 1.9;
        this.door.rotation.x = -0.455;
        this.door.position.x = 0;
    }
}

export default Door;
