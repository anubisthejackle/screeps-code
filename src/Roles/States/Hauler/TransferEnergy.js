let Interface = require('state.Interface');

class TransferEnergy extends Interface{

    constructor(creep) {
        super();
        this.creep = creep;        
    }

    Tick() {

        this.creep.say('Give');
        let target = Game.getObjectById(this.creep.memory.dropOffLocation.id);    
        this.creep.transfer(target, RESOURCE_ENERGY, Math.min(target.store.getFreeCapacity(RESOURCE_ENERGY), this.creep.store[RESOURCE_ENERGY]));
        
    }

    OnEnter() {
        this.creep.memory.currentState = 'transferEnergy';
    }

    OnExit() {
        
    }

}

module.exports = TransferEnergy;