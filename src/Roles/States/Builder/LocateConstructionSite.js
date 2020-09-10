let Interface = require('state.Interface');

class LocateConstructionSite extends Interface {
    
    constructor(creep) {
        this.creep = creep;
    }

    Tick() {
        
    }

    OnEnter() {
        this.creep.memory.currentState = 'locatingConstructionSite';
    }

    OnExit() {

    }
}

module.exports=LocateConstructionSite;