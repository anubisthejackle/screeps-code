let Interface = require('state.Interface');

class LocateDropOffLocation extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {
        
        let max = 2;
        let min = 1;

        let choice = Math.floor(Math.random() * (max - min + 1) + min);
        let target;
        
        if(choice == 1){
            this.creep.memory.destinationType = 'controller';
            target = this.creep.room.controller.pos;
            target.id = this.creep.room.controller.id;
        }

        if(choice == 2){
            this.creep.memory.destinationType = 'spawn';
            const spawns = this.creep.room.find(FIND_MY_SPAWNS);
            let spawn = _.sample(spawns);
            target = spawn.pos;
            target.id = spawn.id;
        }

        if(choice == 3){
            this.creep.memory.destinationType = 'container';
            const extensions = this.creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });
            target = _.sample(extensions).pos;
        }

        this.creep.memory.destination = target;
        this.creep.memory.dropOffLocation = target;

    }

    OnEnter() {
        this.creep.memory.currentState = 'locateDropOffLocation';
        this.creep.memory.destinationType = null;
        this.creep.memory.destination = null;
    }

    OnExit() {

    }
}

module.exports=LocateDropOffLocation;