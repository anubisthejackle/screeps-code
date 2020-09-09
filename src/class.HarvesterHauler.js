/**
 * All Creep roles are required to extend Role
 */
let Role=require('class.Role');

/**
 * These mixins are the different Actions this role is allowed to take.
 */
let Harvest=require('mixin.harvest');
let Haul=require('mixin.haul');
let Upgrade=require('mixin.upgrade');
let Build=require('mixin.build');

class HarvesterHauler extends Build(Upgrade(Haul(Harvest(Role)))){}

module.exports=HarvesterHauler;