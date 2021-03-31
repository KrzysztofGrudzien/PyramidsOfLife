import * as THREE from 'three';

class DirectionalLight {
    constructor(color, intensity, x, y, z) {
        this.light = new THREE.DirectionalLight(color, intensity);
        this.lightPosition = this.light.position.set(x, y, z);
    }
}

export default DirectionalLight;
