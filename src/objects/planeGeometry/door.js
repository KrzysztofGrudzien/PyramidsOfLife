import * as THREE from 'three';
import Texture from '../../materials/texture';

class Door {
    constructor() {
        this.texture = new Texture();
        this.geometryDoor = new THREE.PlaneGeometry(1.1, 1.3);
        this.materialDoor = new THREE.MeshStandardMaterial({
            map: this.texture.doorBaseTexture,
            aoMap: this.texture.doorAmbientTexture,
            transparent: true,
            normalMap: this.texture.doorNormalTexture,
            roughnessMap: this.texture.doorRoughnessTexture,
            side: THREE.DoubleSide,
            displacementMap: this.texture.doorHeightTexture,
            displacementScale: 0.3,
            metalnessMap: this.texture.doorMentalnessTexture,
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
