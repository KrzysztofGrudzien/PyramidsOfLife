import * as THREE from 'three';

class App {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = document.querySelector('.webgl');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.height,
            0.1,
            1000,
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });
    }

    resize() {
        window.addEventListener('resize', () => {
            // Update sizes
            this.width;
            this.height;

            // Update camera properties
            camera.aspect = this.height / this.height;
            camera.updateProjectionMatrix();

            // Update renderer function
            renderer.setSize(this.width, this.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    createFullScreen() {
        window.addEventListener('dblclick', () => {
            //Add and remove fullscreen window
            const fullscreenElement =
                document.fullscreenElement || document.webkitFullscreenElement;

            if (!fullscreenElement) {
                if (this.canvas.requestFullscreen) {
                    this.canvas.requestFullscreen();
                } else if (canvas.webkitRequestFullscreen) {
                    this.canvas.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        });
    }

    setUpCameraPosition(x, y, z) {
        // setup positions of camera
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    }

    rendererApp() {
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor('#1c5fc4');
    }
}

export default App;
