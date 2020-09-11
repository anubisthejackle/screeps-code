require('creep');

let Interface = require('state.Interface');
let Upgrader = require('roles.Upgrader');
let Harvester = require('roles.Harvester');
let Hauler = require('roles.Hauler');

class InitialGame extends Interface {

    constructor(room) {
        super();
        this.room = room;
    }

    Tick() {
        this.creeps = this.room.find(FIND_MY_CREEPS);
        
        if(this.creeps.length > 0){
            // console.log("CREEPS: ", JSON.stringify(this.creeps));
            _.forEach(this.creeps, (creep) => {
                
                let role;
                switch(creep.memory.role){
                    case 'harvester':
                        role = new Harvester(creep);
                        break;
                    case 'hauler':
                        role = new Hauler(creep);
                        break;
                    case 'upgrader':
                        role = new Upgrader(creep);
                        break;
                    default:
                        return;
                }
                
                role.Tick();
            })
        }
        
        this.SpawnCreeps();

        // Check for construction sites:
        // If there are fewer than 5 combined extensions and extension construction sites, add one to the map.
        this.PlaceExtension();

    }

    SpawnCreeps(){
        /**
         *
         * - A harvester for every open square surrounding a source 
         * - A hauler for every 2 harvesters (rounded up)
         * - An upgrader for every opens quare surrounding the room controller
         *  
         */
        let spawns = this.room.find(FIND_MY_SPAWNS);
        _.forEach(spawns, spawn => {
            if(spawn.spawning){
                return;
            }

            let harvesterCount = _.filter(this.creeps, (creep) => {
                return creep.memory.role == 'harvester';
            }).length;

            let haulerCount = _.filter(this.creeps, (creep) => {
                return creep.memory.role == 'hauler';
            }).length;

            let upgraderCount = _.filter(this.creeps, (creep) => {
                return creep.memory.role == 'upgrader';
            }).length;
            
            if(this.SpawnHaulers(spawn, haulerCount, harvesterCount) == OK){
                return;
            }

            if(this.SpawnHarvesters(spawn, harvesterCount) == OK){
                return;
            }

            if(this.SpawnUpgrader(spawn, upgraderCount) == OK){
                return;
            }
            
        });

    }

    SpawnHarvesters(spawn, harvesterCount) {
        
        if(harvesterCount > 0 && harvesterCount >= Memory.rooms[this.room.name].maxHarvesters){
            return;
        }

        // We want to update the max number of harvesters whenever we spawn one.
        let maxHarvesters = 0;

        let sources = this.room.find(FIND_SOURCES);
        _.forEach(sources, source => {
            const look = this.room.lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true);
            maxHarvesters += 9 - _.filter(look, {terrain: "wall"}).length; // Remove the number of structures found from the total box size.            
        });

        Memory.rooms[this.room.name].maxHarvesters = maxHarvesters;
        
        let body = Harvester.getBody();
        let result = spawn.spawnCreep(body, Harvester.generateName(), {
            memory: {
                role: 'harvester'
            }
        });

        return result == OK;
        
    }
    
    SpawnHaulers(spawn, haulerCount, harvesterCount) {
        
        if(haulerCount > 0 && haulerCount >= (harvesterCount/2)){
            return;
        }

        let body = Hauler.getBody();
        let result = spawn.spawnCreep(body, Hauler.generateName(), {
            memory: {
                role: 'hauler'
            }
        });
        return result == OK;
    
    }
    
    SpawnUpgrader(spawn, upgraderCount) {
        
        if(upgraderCount > 0 && upgraderCount >= Memory.rooms[this.room.name].maxUpgraders){
            return;
        }

        let maxUpgraders = 0;
        let sources = this.room.find(FIND_SOURCES);
        _.forEach(sources, source => {
            const look = this.room.lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true);
            maxUpgraders += 9 - _.filter(look, {terrain: "wall"}).length; // Remove the number of structures found from the total box size.            
        });

        Memory.rooms[this.room.name].maxUpgraders = maxUpgraders;

        let body = Upgrader.getBody();
        let result = spawn.spawnCreep(body, Upgrader.generateName(), {
            memory: {
                role: 'upgrader'
            }
        });

        return result == OK;

    }

    PlaceExtension(){

        const extensions = this.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        if(extensions.length >= 5){
            return;
        }

        const construction = this.room.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        if((extensions.length + construction.length) >= 5){
            return;
        }

        /**
         * Put some code here that will find a good spot to place the extensions.
         */


    }

    OnEnter() {
        if(!Memory.rooms){
            Memory.rooms = {};
        }

        Memory.rooms[this.room.name].maxHarvesters = 0;
        Memory.rooms[this.room.name].maxUpgraders = 0;
    }

    OnExit() {

    }

}

module.exports = InitialGame;