/**
 * This class is the master Role class.
 * 
 * Every Creep must extend this class. This is also the class that can be passed to various Mixins as the Superclass
 */

const {STATE_SPAWNING,STATE_IDLE,STATE_OPPORTUNISTIC_PICKUP} = require('constants.js');

class Role {

    get bodyBuild(){
        return [];
    }

    run() {

        if(!creep.memory.state) {
            creep.memory.state = STATE_SPAWNING;
        }

        /**
         * Check to see if we should switch to opportunistic pickup state.
         * If yes, do the swap.
         */

        if(this.shouldSwitchToOpportunisticPickupState(creep)){
            creep.memory.returnToState = creep.memory.state;
            creep.memory.state = STATE_OPPORTUNISTIC_PICKUP;
        }

        switch(creep.memory.state) {
            case STATE_SPAWNING:
                this.spawning(creep);
                break;
            case STATE_OPPORTUNISTIC_PICKUP:
                this.opportunisticPickup(creep);
                break;
            case STATE_IDLE:
                this.idle(creep);
                break;
        }

    }

    spawning(creep){
        
    }

    idle(creep){
        
    }

    shouldSwitchToOpportunisticPickupState(creep){
        if(creep.memory.state == STATE_SPAWNING){
            // Can't pickup if you aren't born yet.
            return false;
        }

        if(!creep.getActiveBodyparts(CARRY)){
            // Can't pickup if you have no carry body parts.
            return false;
        }

        let resources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        if(resources.length == 0){
            return false;
        }

        creep.memory.opportunisticPickup = resources.id;
        return true;
    }

    opportunisticPickup(creep){

        let resource = Game.getObjectById(creep.memory.opportunisticPickup);

        if(resource.amount > 0){
            creep.pickup(resource);
        }

        // This line needs to happen when we are finished picking up.
        creep.memory.state = creep.memory.returnToState;
        creep.memory.returnToSTate = null;

    }
    
}

module.exports=Role;