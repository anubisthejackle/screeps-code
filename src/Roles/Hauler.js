let Role = require('roles.Role');

let StateMachine = require('state.Machine');

/** Any States **/
let OpportunisticPickup = require('roles.States.Any.OpportunisticPickup');
let MoveToLocation = require('roles.States.Any.MoveToLocation');

/** Hauler States **/
let TransferToSpawn = require('roles.States.Hauler.TransferToSpawn');
let StoreInContainer = require('roles.States.Hauler.StoreInContainer');
let LocateDropOffLocation = require('roles.States.Hauler.LocateDropOffLocation');
let LocateDroppedEnergy = require('roles.States.Hauler.LocateDroppedEnergy');

class Hauler extends Role{

    constructor(creep) {
        super();

        this._stateMachine = new StateMachine();

        /** States **/
        let pickUp = new OpportunisticPickup(creep);
        let moveToLocation = new MoveToLocation(creep);
        let transferToSpawn = new TransferToSpawn(creep);
        let storeInContainer = new StoreInContainer(creep);
        let locateDropOffLocation = new LocateDropOffLocation(creep);
        let locateDroppedEnergy = new LocateDroppedEnergy(creep);
        
        /** Transition Conditions **/
        let InRangeOfDroppedResource = () => { return creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1).length > 0 && (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()); }
        let HasMovementTarget = () => { return creep.memory.destination != null; };
        let ReachedDestination = () => { return (creep.memory.destination) && (Math.abs(creep.pos.x - creep.memory.destination.x) <  2 && Math.abs(creep.pos.y - creep.memory.destination.y) < 2) };
        let MovementTargetTypeSpawn = () => { return creep.memory.destinationType == 'spawn'; };
        let MovementTargetTypeContainer = () => { return creep.memory.destinationType == 'container'; };
        let FullOfEnergy = () => { return creep.store[RESOURCE_ENERGY] == creep.store.getCapacity(); };
        let NotYetFull = () => { return creep.store[RESOURCE_ENERGY] < creep.store.getCapacity(); };
        let EmptyOfEnergy = () => { return creep.store[RESOURCE_ENERGY] == 0; };
        
        let And = (c1,c2) => { return () => { return c1() && c2()} };
        
        /** Any Transitions **/
        this._stateMachine.AddAnyTransition(pickUp, InRangeOfDroppedResource);
        
        /** State Transitions **/
        this._stateMachine.AddTransition(storeInContainer, locateDroppedEnergy, EmptyOfEnergy);
        this._stateMachine.AddTransition(transferToSpawn, locateDroppedEnergy, EmptyOfEnergy);
        this._stateMachine.AddTransition(OpportunisticPickup, locateDroppedEnergy, NotYetFull);
        
        /**
         * We are using the fact that the Any transition auto-picks up to skip that step here.
         */
        this._stateMachine.AddTransition(OpportunisticPickup, locateDropOffLocation, FullOfEnergy);

        this._stateMachine.AddTransition(locateDropOffLocation, moveToLocation, HasMovementTarget);
                 
        this._stateMachine.AddTransition(moveToLocation, transferToSpawn, And(ReachedDestination, MovementTargetTypeSpawn));
        this._stateMachine.AddTransition(moveToLocation, storeInContainer, And(ReachedDestination, MovementTargetTypeContainer));
        
        if(creep.memory.currentState){
            eval("this._stateMachine.SetState(" + creep.memory.currentState + ");")
        }else{
            this._stateMachine.SetState(locateSource);
        }

    }

    Tick() {
        this._stateMachine.Tick();
    }

    static getBody(level){
        switch(level){
            case 1:
            default:
                return [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE];
        }
    }

}

module.exports=Hauler;