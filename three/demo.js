import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// References: 	https://threejs.org/docs/#examples/en/controls/OrbitControls
//			 	https://threejs.org/docs/#manual/en/introduction/Loading-3D-models
//				https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_orbit.html

let camera, controls, scene, renderer;

init();
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0, 0, 0);

	// controls

	controls = new OrbitControls( camera, renderer.domElement );
	controls.listenToKeyEvents( window ); // optional
	controls.autoRotate = true;

	controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;

	controls.minDistance = 100;
	controls.maxDistance = 500;

	controls.maxPolarAngle = Math.PI / 2;

	// 3D model

	const loader = new GLTFLoader();

	loader.load( 'three/models/scene_test.glb', function ( gltf ) {
		scene.add( gltf.scene );

	}, undefined, function ( error ) {
		console.error( error );

	} );

	// lights

	const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
	dirLight1.position.set( 1, 1, 1 );
	scene.add( dirLight1 );

	const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
	dirLight2.position.set( - 1, - 1, - 1 );
	scene.add( dirLight2 );

	const ambientLight = new THREE.AmbientLight( 0x555555 );
	scene.add( ambientLight );

	//

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

	render();

}

function render() {

	renderer.render( scene, camera );

}
