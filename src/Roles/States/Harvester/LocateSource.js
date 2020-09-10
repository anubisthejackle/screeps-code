let Interface = require('state.Interface');

class LocateSource extends Interface {

    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick(){
        let searchResults = this.creep.room.find(FIND_SOURCE);

        if(searchResults.length == 0){
            return;
        }

        let target = _.sample(searchResults);

        this.creep.memory.destination = {
            id: target.id,
            x: target.pos.x,
            y: target.pos.y
        };

        this.creep.memory.source = this.creep.memory.destination;

        this.creep.memory.destinationType = 'source';
    }

    OnEnter() {
        this.creep.memory.currentState = 'locateSource';
    }

    OnExit() {}

}

module.exports=LocateSource;