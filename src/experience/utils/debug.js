
import * as lil from 'lil-gui';
export default class Debug {
    constructor() {
        this.active = window.location.hash === '#Debug';

        if(this.active){
            this.ui = new lil.GUI();
        }
    }

}