import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// References: 	https://threejs.org/docs/#examples/en/controls/OrbitControls
//				https://medium.com/intuitionmath/creating-a-360-image-using-threejs-cube-mapping-e00a9bb604f1

let camera, controls, scene, renderer, cubeCamera;

init();
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {

	// Set up the scene
	scene = new THREE.Scene();

	// Create the camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 1;

	// Create the renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Add OrbitControls
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true; // Smoothly damping effect during rotation
	controls.dampingFactor = 0.05;
	controls.autoRotate = true;
	controls.autoRotateSpeed = 0.5;

	const cubeTextureLoader = new THREE.CubeTextureLoader();
	cubeTextureLoader.setPath('three/libraryCubeMap/');
	const skyboxTexture = cubeTextureLoader.load([
     'px.png', 'nx.png', 'py.png',
     'ny.png', 'pz.png', 'nz.png'
	]);
	scene.background = skyboxTexture;

	// Create the CubeRenderTarget
	const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512);
	cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
	scene.add(cubeCamera);

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	requestAnimationFrame(animate);
   // Update the CubeCamera's environment map
   cubeCamera.update(renderer, scene);
   // Render the main scene
   renderer.render(scene, camera);
   controls.update();

}