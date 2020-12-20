var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            let source;

            if(creep.memory.source){
                source = Game.getObjectById(creep.memory.source);
            }else{
                var sources = creep.room.find(FIND_SOURCES);
                source = sources[Math.floor(Math.random() * sources.length)];
                creep.memory.source = source.id;
            }

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                if(creep.memory.noTargetCount == null){
                    creep.memory.noTargetCount = 0;
                }

                creep.memory.noTargetCount++;

                if(creep.memory.noTargetCount > 10){
                    creep.memory.role = 'temp-upgrader';
                }
            }
        }
    }
};

module.exports = roleHarvester;