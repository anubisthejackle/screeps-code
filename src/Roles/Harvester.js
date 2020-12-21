const StateMachine = require('../StateMachine');

const transitions = {
    IDLE: {
        run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            source = sources[Math.floor(Math.random() * sources.length)];
            creep.memory.source = source.id;
            this.changeState("HARVESTING");
        }
    },
    HARVESTING: {
        run: function(creep) {
            let source = Game.getObjectById(creep.memory.source);
            
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            if(creep.store.getFreeCapacity() == 0){
                return this.changeState("FINDSTORAGE");
            }
        }
    },
    FINDSTORAGE: {
        run: function(creep) {
            var targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            let target = targets[Math.floor(Math.random() * sources.length)];

            creep.memory.target = target.id;

            this.changeState("DEPOSITING");
        }
    },
    DEPOSITING: {
        run: function(creep) {
            let target = Game.getObjectById(creep.memory.target);

            let errCode = creep.transfer(target, RESOURCE_ENERGY);

            if(errCode == ERR_NOT_IN_RANGE) {
                return creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }

            if(errCode == ERR_FULL){
                return this.changeState('FINDSTORAGE');
            }

            if(creep.store.getFreeCapacity() == 0){
                return this.changeState('HARVESTING');
            }
        }
    }
}

class Harvester {

    constructor(creep) {
        this.creep = creep;
        this.machine = new StateMachine((creep.memory.currentState || "IDLE"), transitions);
    }

    run() {

        this.machine.dispatch('run', this.creep);

    }

}

module.exports = Harvester;