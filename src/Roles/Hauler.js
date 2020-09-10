/**
 * All Creep roles are required to extend Role
 */
let Role=require('roles.Role');

/**
 * These mixins are the different Actions this role is allowed to take.
 */
let Haul=require('mixins.haul');

class Harvester extends Haul(Role){}

module.exports=Harvester;