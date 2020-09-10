let StateMachine = require('state.Machine');
let StateInitialGame = require('game.States.InitialGame');
class Room {

    constructor(room) {

        this._stateMachine = new StateMachine();

        this._stateMachine.AddAnyTransition(new StateInitialGame(room), () => {
            // console.log('Checking state');
            const extensions = room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            });

            return (room.controller.level < 2 || extensions.length < 5);

        });

    }

    Tick() {

        this._stateMachine.Tick();

    }

}

module.exports=Room;