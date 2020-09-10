let Interface = require('state.Interface');

class MoveToLocation extends Interface {
    
    constructor(creep) {
        this.creep = creep;
    }

    Tick() {
        
        this.creep.moveTo(this.creep.memory.destination.x, this.creep.memory.destination.y);
        
        if(Math.abs(this.creep.pos.x - pos.x) < (range + 1) && Math.abs(this.creep.pos.y - pos.y) < (range + 1)){
            this.creep.memory.destination = null;
        }

    }

    OnEnter() {
        this.creep.memory.currentState = 'moving';
    }

    OnExit() {

    }
}

module.exports=MoveToLocation;