let Interface = require('state.Interface');

class OpportunisticPickup extends Interface {
    constructor(creep){
        super();
        this.creep = creep;
    }
    
    Tick() {
        let resource = this.creep.room.findInRange(FIND_DROPPED_RESOURCES, 1);
        if(!resource){
            return;
        }
        this.creep.pickup(resource);
    }

    OnEnter() {

    }

    OnExit() {

    }
}

module.exports=OpportunisticPickup;