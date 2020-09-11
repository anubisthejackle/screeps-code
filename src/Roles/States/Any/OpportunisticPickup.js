let Interface = require('state.Interface');

class OpportunisticPickup extends Interface {
    constructor(creep){
        super();
        this.creep = creep;
    }
    
    Tick() {
        console.log("Running");
        let resource = this.creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        console.log(resource);
        if(!resource[0]){
            return;
        }
        this.creep.pickup(resource[0]);
    }

    OnEnter() {

    }

    OnExit() {

    }
}

module.exports=OpportunisticPickup;