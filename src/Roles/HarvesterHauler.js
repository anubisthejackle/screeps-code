let Role = require('roles.Role');

/**
 * These mixins are the different Actions this role is allowed to take.
 */
let Harvest=require('mixins.harvest');
let Haul=require('mixins.haul');
let Upgrade=require('mixins.upgrade');
let Build=require('mixins.build');

let StateMachine = require('state.Machine');

class HarvesterHauler extends Role{

    constructor(creep) {

        this.body = [WORK, CARRY, CARRY, CARRY, MOVE];

        this._stateMachine = new StateMachine();

    }

    Tick() {
        this._stateMachine.Tick();
    }

}

module.exports=HarvesterHauler;