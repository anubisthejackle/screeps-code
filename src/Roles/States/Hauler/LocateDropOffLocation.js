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
        choice = 1; // Force choice to spawn.
        // if(choice == 1){
        //     this.creep.memory.destinationType = 'controller';
        //     target = this.creep.room.controller.pos;
        //     target.id = this.creep.room.controller.id;
        // }

        
        if(choice == 2){

            // Locate all extensions that are not full.
            // Order by lowest filled state
            // This is the target.

            // this.creep.memory.destinationType = 'container';
            // const extensions = this.creep.room.find(FIND_MY_STRUCTURES, {
            //     filter: { structureType: STRUCTURE_CONTAINER }
            // });
            // if(_.filter(extensions).length > 0){
            //     target = _.sample(extensions).pos;
            // }
        }
        
        if(choice == 1 || !target){
            // If we picked the spawn, or if we picked a container but couldn't find one.
            this.creep.memory.destinationType = 'spawn';
            const spawns = this.creep.room.find(FIND_MY_SPAWNS);
            let spawn = _.sample(spawns);
            target = spawn.pos;
            target.id = spawn.id;
        }

        this.creep.memory.destination = target;
        this.creep.memory.dropOffLocation = target;

    }

    OnEnter() {
        this.creep.memory.currentState = 'locateDropOffLocation';
    }

    OnExit() {

    }
}

module.exports=LocateDropOffLocation;