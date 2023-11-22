import * as THREE from 'three'
class Boid {
    constructor(scene) {
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 0.25, 0.25), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
        this.vel = { x: 0, y: 0 };
        this.angle = 0;
        this.scene = scene;
    }

    //add mesh to scene
    addMesh() {
        this.scene.add(this.mesh)
    }

    //polar to cartesian = taken from the tutorial
    pol2car(distance, angle) {
        return {
            x: distance * Math.cos(angle),
            z: distance * Math.sin(angle)
        };
    }

    //update the movement - modified from the tutorial
    updateForward(distance) {
        this.vel = this.pol2car(distance, this.mesh.rotation.y);
        this.mesh.position.x += this.vel.x * 60
        this.mesh.position.z -= this.vel.z * 60

        // constraint max/min positions
        if (this.mesh.position.z > 50 || this.mesh.position.z < -50) {
            this.mesh.position.z += this.vel.z * 60
        }
        if (this.mesh.position.x > 50 || this.mesh.position.x < -50) {
            this.mesh.position.x -= this.vel.x * 60
        }
    }
    //update angle modified from the tutorial
    updateAngle(angle) {
        this.mesh.rotation.y += angle;
    }
    
}
export default Boid