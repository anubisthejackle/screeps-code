let Interface = require('state.Interface');

class UpgradeRoomController extends Interface {

    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {

        this.creep.say('Upgrade');
        let result = this.creep.upgradeController(this.creep.room.controller);
        if(result == ERR_NOT_IN_RANGE){
            this.creep.moveTo(this.creep.room.controller);
        }

    }

    OnEnter() {
        this.creep.memory.currentState = 'upgradeRoomController';
    }

    OnExit() {
        
    }

}

module.exports = UpgradeRoomController;