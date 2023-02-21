import Experience from "../experience";
import { ThirdPersonCamera } from "../utils/third-person-camera";
import Environment from "./enviroment";
import Floor from "./floor";
import Player from './player';

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.resources.on(('ready'), () => {

            // Setup
            this.floor = new Floor();
            this.player = new Player();
            this.enviroment = new Environment();
            console.log(this.experience.camera);
            this.thirdPersonCamera = new ThirdPersonCamera({model: this.player.model, camera: this.experience.camera});
        })
    }

    update() {
        if(this.player){
            this.player.update(); 
        }

        if(this.thirdPersonCamera){
            this.thirdPersonCamera.update();    
        }
    }
}