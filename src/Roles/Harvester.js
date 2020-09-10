/**
 * All Creep roles are required to extend Role
 */
let Role=require('roles.Role');

/**
 * These mixins are the different Actions this role is allowed to take.
 */
let Harvest=require('mixins.harvest');

class Harvester extends Harvest(Role){}

module.exports=Harvester;