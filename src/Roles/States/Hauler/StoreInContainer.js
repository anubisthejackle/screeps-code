class StoreInContainer {

    constructor() {
        
    }

    Tick() {

    }

    OnEnter() {
        this.creep.memory.currentState = 'storeInContainer';
    }

    OnExit() {
        
    }

}

module.exports = StoreInContainer;