let Interface = require('state.Interface');

class TransferToSpawn extends Interface{

    constructor(creep) {
        super();
        this.creep = creep;        
    }

    Tick() {

        this.creep.say('Deposit');
        let spawn = Game.getObjectById(this.creep.memory.dropOffLocation.id);        
        this.creep.transfer(spawn, RESOURCE_ENERGY, Math.min(spawn.store.getFreeCapacity(RESOURCE_ENERGY), this.creep.store[RESOURCE_ENERGY]));
        
    }

    OnEnter() {
        this.creep.memory.currentState = 'transferToSpawn';
    }

    OnExit() {
        
    }

}

module.exports = TransferToSpawn;