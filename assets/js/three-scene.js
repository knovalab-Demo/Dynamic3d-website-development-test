import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('three-container');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

/* Lighting */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

/* Load Model */

let model;

const loader = new GLTFLoader();

loader.load(
  '/assets/3d/models/seperated__camcorder.glb',
  (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

/* Render Loop */

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

/* Resize */

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
