import * as THREE from 'three';
import './style.css'
import gsap from "gsap"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFEF5EA)

// Load GLTF model
const loader = new GLTFLoader();
loader.load(
  'boba_tea_cup.glb',
  (gltf) => {
    
    const model = gltf.scene;
    
    model.rotation.y += -1
    tl.fromTo(model.position, {z:0, x:-4, y:10}, {z:0, x:-1.4, y:-3})
    scene.add(model);
  },
  (xhr) => {
    
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    
    console.error('An error happened', error);
  }
);



//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 100, 100,)
light.position.set(0, 5, -10)
scene.add(light)

const backlight = new THREE.PointLight(0xffffff, 80, 100);
backlight.position.set(0, 5, 10 )
scene.add(backlight)

const rightlight = new THREE.PointLight(0xffffff, 100, 100);
rightlight.position.set(10, 0, 0)
scene.add(rightlight)

const leftlight = new THREE.PointLight(0xffffff, 100, 100);
leftlight.position.set(-10, 0, 0)
scene.add(leftlight)

const botlight = new THREE.PointLight(0xffffff, 50, 100);
botlight.position.set(0, -10, 0)
scene.add(botlight)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = -14
scene.add(camera)



//Renderer
const canvas = document.querySelector('.webgl');
const Renderer = new THREE.WebGLRenderer({ canvas });
Renderer.setSize(sizes.width, sizes.height)
Renderer.setPixelRatio(2)
Renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 0


//Resize
window.addEventListener("resize", () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update Camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height
  Renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  Renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline
const tl = gsap.timeline({defaults: {duration: 1.25}})
tl.fromTo('nav', {y: '-100%' }, {y: '0%' })


