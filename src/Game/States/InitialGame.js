require('Creep.js');

let Interface = require('state.Interface');
let HarvesterHauler = require('roles.HarvesterHauler');
class InitialGame extends Interface {

    constructor(room) {
        this.room = room;
    }

    Tick() {
        this.creeps = this.room.find(FIND_MY_CREEPS);
        
        if(this.creeps.length > 0){
            this.creeps.forEach((creep) => {
                creep.getRole().Tick();
            })
        }

        const maxCreepCount = this.DefineMaxCreeps();
        this.SpawnCreeps(maxCreepCount);

        // Check for construction sites:
        // If there are fewer than 5 combined extensions and extension construction sites, add one to the map.
        this.PlaceExtension();
    }

    DefineMaxCreeps() {

        let maxCreepCount = Memory.rooms[this.room.name].maxCreepCount;

        if(maxCreepCount != 0){
            return maxCreepCount;
        }

        let sources = this.room.find(FIND_SOURCES);
        sources.forEach(source => {
            const look = creep.room.lookForAtArea(LOOK_STRUCTURES, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true);
            maxCreepCount += 9 - look.length; // Remove the number of structures found from the total box size.            
        });

        Memory.rooms[this.room.name].maxCreepCount = maxCreepCount;
        return maxCreepCount;
    }

    SpawnCreeps(maxCreepCount){
        
        if(creeps.length == maxCreepCount){
            // We are already at the maximum number of creeps, so skip spawning.
            return;
        }

        let spawns = this.room.find(FIND_MY_SPAWNS);
        spawns.forEach(spawn => {
            if(spawn.spawning){
                return;
            }
            let toSpawn = new HarvesterHauler();
            spawn.spawnCreep(toSpawn.body, toSpawn.generateName(), {
                memory: {
                    role: 'harvesterHauler'
                }
            });
        })
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
            Memory.rooms = [];
        }
        if(!Memory.rooms[this.room.name]){
            Memory.rooms[this.room.name] = {
                maxCreepCount: 0,
            };
        }
    }

    OnExit() {

    }

}

module.exports = InitialGame;