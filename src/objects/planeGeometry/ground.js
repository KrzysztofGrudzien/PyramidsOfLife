import * as THREE from 'three';
import Texture from '../../materials/texture';

class Ground {
    constructor() {
        this.texture = new Texture();
        this.geometryPlane = new THREE.PlaneGeometry(40, 40);
        this.materialPlane = new THREE.MeshStandardMaterial({
            map: this.texture.bricksBaseTexture,
            aoMap: this.texture.bricksAmbientTexture,
            transparent: true,
            displacementMap: this.texture.bricksHeightTexture,
            normalMap: this.texture.bricksNormalTexture,
            roughnessMap: this.texture.bricksRoughnessTexture,
            side: THREE.DoubleSide,
        });

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
