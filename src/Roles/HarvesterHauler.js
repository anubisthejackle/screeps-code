/**
 * All Creep roles are required to extend Role
 */
let Role=require('roles.Role');

/**
 * These mixins are the different Actions this role is allowed to take.
 */
let Harvest=require('mixins.harvest');
let Haul=require('mixins.haul');
let Upgrade=require('mixins.upgrade');
let Build=require('mixins.build');

class HarvesterHauler extends Build(Upgrade(Haul(Harvest(Role)))){}

module.exports=HarvesterHauler;