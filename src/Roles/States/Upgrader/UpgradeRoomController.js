class UpgradeRoomController {

    constructor() {
        
    }

    Tick() {

    }

    OnEnter() {
        this.creep.memory.currentState = 'upgradeRoomController';
    }

    OnExit() {
        
    }

}

module.exports = UpgradeRoomController;