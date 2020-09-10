let Interface = require('state.Interface');
let HarvesterHauler = require('roles.HarvesterHauler');
class InitialGame extends Interface {

    constructor(room) {
        this.room = room;
    }

    Tick() {
        // Iterate over Creeps
        // Determine Creeps type
        // Execute the role.Tick(creep) method for each creep

        // Determine the Maximum creep count
        const maxCreepCount = this.DefineMaxCreeps();
        // Spawn creeps
        this.SpawnCreeps(maxCreepCount);

        // Check for construction sites:
        // If there are fewer than 5 combined extensions and extension construction sites, add one to the map.
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
        let creeps = this.room.find(FIND_MY_CREEPS);
        if(creeps.length == maxCreepCount){
            // We are already at the maximum number of creeps, so skip spawning.
            return;
        }

        let spawns = this.room.find(FIND_MY_SPAWNS);
        spawns.forEach(spawn => {
            spawn.spawnCreep(body, name);
        })
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

module.exports = Interface;