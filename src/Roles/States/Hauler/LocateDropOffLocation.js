let Interface = require('state.Interface');

class LocateDropOffLocation extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {

        let choice = Math.floor(Math.random() * 3) + 1;
        let target;
        
        if(choice == 1){
            creep.memory.destinationType = 'controller';
            target = this.creep.room.controller.pos;
        }

        if(choice == 2){
            creep.memory.destinationType = 'spawn';
            const spawns = this.creep.room.find(FIND_MY_SPAWNS);
            target = _.sample(spawns).pos;
        }

        if(choice == 3){
            creep.memory.destinationType = 'container';
            const extensions = this.creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });
            target = _.sample(extensions).pos;
        }

        creep.memory.destination = target;

    }

    OnEnter() {
        this.creep.memory.currentState = 'locatingDropOff';
    }

    OnExit() {

    }
}

module.exports=LocateDropOffLocation;