let Interface = require('state.Interface');

class MoveToLocation extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {
        if(!this.creep.memory.destination){
            return;
        }

        this.creep.say('Walking');
        this.creep.moveTo(this.creep.memory.destination.x, this.creep.memory.destination.y, {reusePath: 15, visualizePathStyle: {}});

    }

    OnEnter() {
        this.creep.memory.currentState = 'moveToLocation';
    }

    OnExit() {
            
    }
}

module.exports=MoveToLocation;