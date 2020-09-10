let Interface = require('state.Interface');

class MoveToLocation extends Interface {
    Tick() {
        
        creep.moveTo(creep.memory.destination.x, creep.memory.destination.y);
        
        if(Math.abs(creep.pos.x - pos.x) < (range + 1) && Math.abs(creep.pos.y - pos.y) < (range + 1)){
            creep.memory.destination = null;
        }

    }

    OnEnter() {

    }

    OnExit() {

    }
}

module.exports=MoveToLocation;