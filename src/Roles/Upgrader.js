let Role = require('roles.Role');

let StateMachine = require('state.Machine');

/** Any States **/
let OpportunisticPickup = require('roles.States.Any.OpportunisticPickup');

/** Upgrader States **/
let UpgradeRoomController = require('roles.States.Upgrader.UpgradeRoomController');


class Upgrader extends Role{

    constructor(creep) {
        super();

        this._stateMachine = new StateMachine();

        /** States **/
        let pickUp = new OpportunisticPickup(creep);
        let upgradeRoomController = new UpgradeRoomController(creep);
        
        /** Any Transitions **/
        this._stateMachine.AddAnyTransition(pickUp, InRangeOfDroppedResource);
        this._stateMachine.AddAnyTransition(upgradeRoomController, () => { return true; });

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