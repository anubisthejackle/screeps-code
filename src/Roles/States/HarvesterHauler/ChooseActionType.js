let Interface = require('state.Interface');

class ChooseActionType extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {
        
        let choice = Math.floor(Math.random() * 2) + 1;
        choice = 2;
        console.log(choice);
        switch(choice){
            case 1:
                this.creep.memory.actionType = 'build';
                break;
            case 2:
                this.creep.memory.actionType = 'upgrade';
                break;
            case 3:
                this.creep.memory.actionType = 'repair';
                break;
        }

    }

    OnEnter() {
        this.creep.memory.currentState = 'chooseActionType';
    }

    OnExit() {
        this.creep.memory.actionType = null;
    }
}

module.exports=ChooseActionType;