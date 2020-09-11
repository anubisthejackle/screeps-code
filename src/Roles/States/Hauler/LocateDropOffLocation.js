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

        if(choice == 2){
            // Find an upgrader
            let upgraders = _.filter(this.creeps, (creep) => {
                return creep.memory.role == 'upgrader';
            });

            upgrader = _.sample(upgraders);
            target = upgrader.pos;
            target.id = upgrader.id;

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