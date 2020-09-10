let Interface = require('state.Interface');

class HarvestSource extends Interface {
    
    constructor(creep) {
        this.creep = creep;
    }

    Tick() {

        this.creep.harvest(this.creep.memory.destination);
        
        if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
            this.creep.memory.destinationType = null;
        }

    }

    OnEnter() {
        this.creep.memory.currentState = 'harvestSource';
    }

    OnExit() {
        this.creep.memory.destination = null;
    }
}

module.exports=HarvestSource;