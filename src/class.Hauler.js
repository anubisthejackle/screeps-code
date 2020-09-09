/**
 * All Creep roles are required to extend Role
 */
let Role=require('class.Role');

/**
 * These mixins are the different Actions this role is allowed to take.
 */
let Haul=require('mixin.haul');

class Harvester extends Haul(Role){}

module.exports=Harvester;