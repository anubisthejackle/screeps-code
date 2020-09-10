let Role = require('roles.Role');

let StateMachine = require('state.Machine');

let OpportunisticPickup = require('roles.States.Any.OpportunisticPickup');
let MoveToLocation = require('roles.States.Any.MoveToLocation');

let LocateSource = require('roles.States.Harvester.LocateSource');

class HarvesterHauler extends Role{

    constructor(creep) {

        this.body = [WORK, CARRY, CARRY, CARRY, MOVE];

        this._stateMachine = new StateMachine();

        /**
         * States:
         *  - Opportunistic Pickup
         *  - Find a Source
         *  - Move to the Source
         *  - Harvest the Source
         *  - Choose a Deposit Location
         *  - Move to Deposit Location
         *  - Transfer Energy to Source
         *  - Upgrade Room Controller
         */

        this._stateMachine.AddAnyTransition(new OpportunisticPickup(creep), () => {
            let resource = creep.room.findInRange(FIND_DROPPED_RESOURCES, 1);
            if(!resource){
                return false;
            }

            return true;
        });

    }

    Tick() {
        this._stateMachine.Tick();
    }

}

module.exports=HarvesterHauler;