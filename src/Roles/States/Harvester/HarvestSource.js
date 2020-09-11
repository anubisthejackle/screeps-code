let Interface = require('state.Interface');

class HarvestSource extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {

        let source = Game.getObjectById(this.creep.memory.source.id);
        this.creep.harvest(source);
        
        if(this.creep.store[RESOURCE_ENERGY] == this.creep.store.getCapacity()){
            this.creep.memory.destinationType = null;
        }

    }

    OnEnter() {
        this.creep.memory.currentState = 'harvestSource';
    }

    OnExit() {
        this.creep.memory.destination = null;
        this.creep.memory.destinationType = null;
        this.creep.memory.source = null;
    }
}

module.exports=HarvestSource;