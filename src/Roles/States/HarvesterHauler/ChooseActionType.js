let Interface = require('state.Interface');

class ChooseActionType extends Interface {
    
    constructor(creep) {
        super();
        this.creep = creep;
    }

    Tick() {
        
        let max = 2;
        let min = 1;

        let choice = Math.floor(Math.random() * (max - min + 1) + min);
        choice = 2;
        
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