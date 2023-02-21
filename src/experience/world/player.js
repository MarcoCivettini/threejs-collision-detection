import Experience from "../experience";
import * as THREE from 'three';
import { BasicCharacterController} from './../utils/movements';

export default class Player {
    constructor() {
        this.expirience = new Experience();
        this.scene = this.expirience.scene;
        this.resources = this.expirience.resources;
        this.time = this.expirience.time;
        this.debug = this.expirience.debug;

        this.speed = 0.06;
        this.rotationSmoothing = 0.15;
        
        this.createPlayer();
        this.characterController = new BasicCharacterController({model: this.model, speed: this.speed, rotationSmoothing: this.rotationSmoothing } );
    }

    createPlayer() {
        this.model = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshBasicMaterial({ color: 'darkgreen' }))
        this.model.position.y = 0.5;
        this.model.castShadow = true;
        this.scene.add(this.model);

    }

    update() {
        this.characterController.update();
    }
}