import * as THREE from 'three';

class AmbientLight {
    constructor(color, intensity) {
        this.light = new THREE.AmbientLight(color, intensity);
    }
}

export default AmbientLight;
