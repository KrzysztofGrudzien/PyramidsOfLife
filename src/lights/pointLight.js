import * as THREE from 'three';

class PointLight {
    constructor(color, intensity, distance, x = null, y = null, z = null) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.light = new THREE.PointLight(color, intensity, distance);
        this.lightPosition = this.light.position.set(x, y, z);
    }
}

export default PointLight;
