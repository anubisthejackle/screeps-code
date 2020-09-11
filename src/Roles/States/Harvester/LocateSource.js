let Interface = require('state.Interface');

class LocateSource extends Interface {

    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick(){
        // console.log('LS1');
        let searchResults = this.creep.room.find(FIND_SOURCES);
        
        if(!searchResults){
            console.log('Nothing found');
            return;
        }
        
        let target = _.sample(searchResults);
        // console.log(target);
        
        this.creep.memory.destination = {
            id: target.id,
            x: target.pos.x,
            y: target.pos.y
        };
        
        this.creep.memory.source = this.creep.memory.destination;
        // console.log(this.creep.memory.source);
        
        this.creep.memory.destinationType = 'source';
        // console.log(this.creep.memory.destinationType);
    }

    OnEnter() {
        this.creep.memory.currentState = 'locateSource';
    }

    OnExit() {}

}

module.exports=LocateSource;