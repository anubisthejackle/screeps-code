let Role = require('roles.Role');

let StateMachine = require('state.Machine');

/** Any States **/
let MoveToLocation = require('roles.States.Any.MoveToLocation');

/** Harvester States **/
let LocateSource = require('roles.States.Harvester.LocateSource');
let HarvestSource = require('roles.States.Harvester.HarvestSource');

class Harvester extends Role{

    constructor(creep) {
        super();

        this._stateMachine = new StateMachine();

        /** States **/
        let locateSource = new LocateSource(creep);
        let moveToLocation = new MoveToLocation(creep);
        let harvestSource = new HarvestSource(creep);
        
        /** Transition Conditions **/
        let HasMovementTarget = () => { return creep.memory.destination != null; };
        let ReachedDestination = () => { return (creep.memory.destination) && (Math.abs(creep.pos.x - creep.memory.destination.x) <  2 && Math.abs(creep.pos.y - creep.memory.destination.y) < 2) };
        
        /** State Transitions **/
        this._stateMachine.AddTransition(locateSource, moveToLocation, HasMovementTarget);
        this._stateMachine.AddTransition(moveToLocation, harvestSource, ReachedDestination);
        
        if(creep.memory.currentState){
            eval("this._stateMachine.SetState(" + creep.memory.currentState + ");")
        }else{
            this._stateMachine.SetState(locateSource);
        }

    }

    Tick() {
        this._stateMachine.Tick();
    }

    static getBody(level = 1){
        switch(level){
            case 1:
            default:
                return [WORK, WORK, MOVE, MOVE];
        }
    }

}

module.exports=Harvester;