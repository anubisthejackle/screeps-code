let Role = require('roles.Role');

let StateMachine = require('state.Machine');
let Interface = require('state.Interface');

/** Any States **/
let OpportunisticPickup = require('roles.States.Any.OpportunisticPickup');
let MoveToLocation = require('roles.States.Any.MoveToLocation');

/** Upgrader States **/
let UpgradeRoomController = require('roles.States.Upgrader.UpgradeRoomController');

/** Harvester States **/
let LocateSource = require('roles.States.Harvester.LocateSource');
let HarvestSource = require('roles.States.Harvester.HarvestSource');

/** Hauler States **/
let TransferToSpawn = require('roles.States.Hauler.TransferToSpawn');
let StoreInContainer = require('roles.States.Hauler.StoreInContainer');
let LocateDropOffLocation = require('roles.States.Hauler.LocateDropOffLocation');

/** Builder States **/
let LocateConstructionSite = require('roles.States.Builder.LocateConstructionSite');
let LocateRepairSite = require('roles.States.Builder.LocateRepairSite');

/** HarvesterHauler States **/
let ChooseActionType = require('roles.States.HarvesterHauler.ChooseActionType');

class HarvesterHauler extends Role{

    constructor(creep) {
        super();

        this._stateMachine = new StateMachine();

        /** States **/
        let pickUp = new OpportunisticPickup(creep);
        let locateSource = new LocateSource(creep);
        let moveToLocation = new MoveToLocation(creep);
        let harvestSource = new HarvestSource(creep);
        let upgradeRoomController = new UpgradeRoomController(creep);
        let transferToSpawn = new TransferToSpawn(creep);
        let storeInContainer = new StoreInContainer(creep);
        let locateDropOffLocation = new LocateDropOffLocation(creep);
        let chooseActionType = new ChooseActionType(creep);
        let locateConstructionSite = new LocateConstructionSite(creep);
        let locateRepairSite = new LocateRepairSite(creep);

        
        /** Transition Conditions **/
        let InRangeOfDroppedResource = () => { return creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1).length > 0 && (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()); }
        let HasMovementTarget = () => { return creep.memory.destination != null; };
        let ReachedDestination = () => { return (creep.memory.destination) && (Math.abs(creep.pos.x - creep.memory.destination.x) <  2 && Math.abs(creep.pos.y - creep.memory.destination.y) < 2) };
        let MovementTargetTypeSource = () => { return creep.memory.destinationType == 'source'; };
        let MovementTargetTypeController = () => { return creep.memory.destinationType == 'controller'; };
        let MovementTargetTypeSpawn = () => { return creep.memory.destinationType == 'spawn'; };
        let MovementTargetTypeContainer = () => { return creep.memory.destinationType == 'container'; };
        let MovementTargetTypeConstruction = () => { return creep.memory.destinationType == 'construction'; };
        let FullOfEnergy = () => { return creep.store[RESOURCE_ENERGY] == creep.store.getCapacity() };
        let EmptyOfEnergy = () => { return !FullOfEnergy(); };
        let ChoseToBeUpgrader = () => { return creep.memory.actionType == 'upgrade'; };
        let ChoseToBeBuilder = () => { return creep.memory.actionType == 'build'; };
        let ChoseToBeRepairer = () => { return creep.memory.actionType == 'repair'; };

        let And = (c1,c2) => { return () => { return c1() && c2()} };
        
        /** Any Transitions **/
        this._stateMachine.AddAnyTransition(pickUp, InRangeOfDroppedResource);
        
        /** State Transitions **/
        this._stateMachine.AddTransition(locateSource, moveToLocation, HasMovementTarget);
        this._stateMachine.AddTransition(locateRepairSite, moveToLocation, HasMovementTarget);
        this._stateMachine.AddTransition(locateDropOffLocation, moveToLocation, HasMovementTarget);
        this._stateMachine.AddTransition(locateConstructionSite, moveToLocation, HasMovementTarget);
        
        this._stateMachine.AddTransition(OpportunisticPickup, chooseActionType, FullOfEnergy);
        this._stateMachine.AddTransition(harvestSource, chooseActionType, FullOfEnergy);
        
        this._stateMachine.AddTransition(chooseActionType, locateDropOffLocation, ChoseToBeUpgrader);
        this._stateMachine.AddTransition(chooseActionType, locateConstructionSite, ChoseToBeBuilder);
        this._stateMachine.AddTransition(chooseActionType, locateRepairSite, ChoseToBeRepairer);
        
        // this._stateMachine.AddTransition(moveToLocation, buildConstructionSite, MovementTargetTypeConstruction);
        this._stateMachine.AddTransition(moveToLocation, harvestSource, And(ReachedDestination, MovementTargetTypeSource));
        this._stateMachine.AddTransition(moveToLocation, upgradeRoomController, And(ReachedDestination, MovementTargetTypeController));
        this._stateMachine.AddTransition(moveToLocation, transferToSpawn, And(ReachedDestination, MovementTargetTypeSpawn));
        this._stateMachine.AddTransition(moveToLocation, storeInContainer, And(ReachedDestination, MovementTargetTypeContainer));
        
        this._stateMachine.AddTransition(upgradeRoomController, locateSource, EmptyOfEnergy);
        this._stateMachine.AddTransition(transferToSpawn, locateSource, EmptyOfEnergy);
        this._stateMachine.AddTransition(storeInContainer, locateSource, EmptyOfEnergy);
        
        if(creep.memory.currentState){
            console.log(creep.memory.currentState);
            eval("this._stateMachine.SetState(" + creep.memory.currentState + ");")
        }

        if(!creep.memory.currentState){
            this._stateMachine.SetState(locateSource);
        }
        console.log(creep.id,creep.memory.currentState);
    }

    Tick() {
        this._stateMachine.Tick();
    }

    static getBody(){
        return [WORK, CARRY, CARRY, CARRY, MOVE];
    }

}

module.exports=HarvesterHauler;