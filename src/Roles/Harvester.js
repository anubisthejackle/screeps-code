const StateMachine = require('../StateMachine');

const transitions = {
    IDLE: {
        run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            source = sources[Math.floor(Math.random() * sources.length)];
            creep.memory.source = source.id;
            this.changeState("HARVESTING", creep);
        }
    },
    HARVESTING: {
        run: function(creep) {
            let source = Game.getObjectById(creep.memory.source);
            
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                return creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            if(creep.store.getFreeCapacity() == 0){
                return this.changeState("FINDSTORAGE", creep);
            }
        }
    },
    FINDSTORAGE: {
        run: function(creep) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            let target = targets[Math.floor(Math.random() * targets.length)];

            creep.memory.target = target.id;

            this.changeState("DEPOSITING", creep);
        }
    },
    DEPOSITING: {
        run: function(creep) {
            let target = Game.getObjectById(creep.memory.target);

            let errCode = creep.transfer(target, RESOURCE_ENERGY);

            if(errCode == ERR_NOT_IN_RANGE) {
                return creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }

            if(errCode == ERR_FULL){
                return this.changeState('FINDSTORAGE', creep);
            }

            if(creep.store.getFreeCapacity() == 0){
                return this.changeState('HARVESTING', creep);
            }
        }
    },

    onAnyChange: function(previousState, newState, creep) {
        if(creep.memory){
            creep.memory.currentState = newState;
        }
    }
};

class Harvester extends StateMachine {

    constructor(creep) {
        super((creep.memory.currentState || "IDLE"), transitions);
        this.creep = creep;
    }

    run() {
        this.dispatch(this, 'run', this.creep);
    }

}

module.exports = Harvester;