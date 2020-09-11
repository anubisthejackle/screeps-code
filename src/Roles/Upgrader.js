let Role = require('roles.Role');

let StateMachine = require('state.Machine');

/** Any States **/
let OpportunisticPickup = require('roles.States.Any.OpportunisticPickup');
let MoveToLocation = require('roles.States.Any.MoveToLocation');

/** Upgrader States **/
let UpgradeRoomController = require('roles.States.Upgrader.UpgradeRoomController');


class Upgrader extends Role{

    constructor(creep) {
        super();

        this._stateMachine = new StateMachine();

        creep.memory.destination = creep.room.controller.pos;
        /** States **/
        let pickUp = new OpportunisticPickup(creep);
        let upgradeRoomController = new UpgradeRoomController(creep);
        let moveToLocation = new MoveToLocation(creep);

        
        let InRangeOfDroppedResource = () => { return creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1).length > 0 && (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()); }
        let ReachedDestination = () => { return (creep.memory.destination) && (Math.abs(creep.pos.x - creep.memory.destination.x) <  2 && Math.abs(creep.pos.y - creep.memory.destination.y) < 2) };

        /** Any Transitions **/
        this._stateMachine.AddAnyTransition(pickUp, InRangeOfDroppedResource);
        
        this._stateMachine.AddTransition(moveToLocation, upgradeRoomController, ReachedDestination);
        this._stateMachine.AddTransition(pickUp, upgradeRoomController, () => { return true; });

        if(creep.memory.currentState){
            this._stateMachine.SetState(moveToLocation);
        }
    }

    Tick() {
        this._stateMachine.Tick();
    }

    static getBody(level){
        switch(level){
            case 1:
            default:
                return [WORK, WORK, CARRY, MOVE];
        }
    }

}

module.exports=Upgrader;