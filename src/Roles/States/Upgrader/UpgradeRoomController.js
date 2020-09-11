let Interface = require('state.Interface');

class UpgradeRoomController extends Interface {

    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {

        this.creep.say('Upgrade');
        let controller = Game.getObjectById(this.creep.memory.dropOffLocation.id);
        let result = this.creep.upgradeController(controller);

    }

    OnEnter() {
        this.creep.memory.currentState = 'upgradeRoomController';
    }

    OnExit() {
        
    }

}

module.exports = UpgradeRoomController;