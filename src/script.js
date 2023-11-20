import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Boid from './boid'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
scene.background = new THREE.Color(0xffffff)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.z = 12
camera.position.y = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Generate Instances
const MAX_INSTANCES = 550;
const instances = []
const initializaInstances = () => {
  for(let i=0; i<MAX_INSTANCES; i++) {
    let boid = new Boid(scene);
    instances.push(boid)
    boid.addMesh()
  }
}
initializaInstances()

// Animate
const clock = new THREE.Clock()

const tick = () =>
{   
  for(const boid of instances) {
    boid.updateAngle( 1 * Math.random() * (Math.random() - 0.5));
    boid.updateForward(0.001);
  }
    
    
   
    const elapsedTime = clock.getElapsedTime()
   
    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()