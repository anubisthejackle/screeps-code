let Interface = require('state.Interface');

class LocateConstructionSite extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {
        
    }

    OnEnter() {
        this.creep.memory.currentState = 'locateConstructionSite';
    }

    OnExit() {

    }
}

module.exports=LocateConstructionSite;