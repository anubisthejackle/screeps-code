Source.sourcePriority = function(source) {
    let priority;
    if (source.ticksToRegeneration == undefined) {
        priority = 10;
    } else if (source.energy == 0) {
        priority = 0;
    } else {
        priority = source.energy / source.ticksToRegeneration;
    }
    if (priority > 0 && source.ticksToRegeneration < 150) {
        priority = priority * (1 + (150 - source.ticksToRegeneration)/250);
        if (source.ticksToRegeneration < 70) {
            priority = priority + (70 - source.ticksToRegeneration)/10;
        }
    }
    return priority;
};

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            let used;

            let switchSource = _.random(0, 4) == 0;
            if (Source.sourcePriority(sources[1]) > Source.sourcePriority(sources[0])) {
                if (switchSource) {
                    used = sources[0];
                } else {
                    used = sources[1];
                }
            } else {
                if (switchSource) {
                    used = sources[1];
                } else {
                    used = sources[0];
                }
            }

            if(creep.harvest(used) == ERR_NOT_IN_RANGE) {
                creep.moveTo(used, {visualizePathStyle: {stroke: '#ffaa00'}});
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
                    creep.memory.role = 'upgrader';
                }
            }
        }
    }
};

module.exports = roleHarvester;