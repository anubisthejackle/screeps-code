let Interface = require('state.Interface');

class OpportunisticPickup extends Interface {
    Tick(creep) {
        let resource = creep.room.findInRange(FIND_DROPPED_RESOURCES, 1);
        if(!resource){
            return;
        }
        creep.pickup(resource);
    }

    OnEnter() {

    }

    OnExit() {

    }
}

module.exports=OpportunisticPickup;