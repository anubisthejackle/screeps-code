let Interface = require('state.Interface');

class LocateDroppedEnergy extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {

        let energy = this.creep.room.find(FIND_DROPPED_RESOURCES, {filter: { resourceType: RESOURCE_ENERGY }});

        let target = _.sample(energy);

        this.creep.memory.destination = target;
        
    }

    OnEnter() {
        this.creep.memory.currentState = 'locateDroppedEnergy';
    }

    OnExit() {

    }
}

module.exports=LocateDroppedEnergy;