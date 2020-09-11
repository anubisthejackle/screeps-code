class StateMachine {

    constructor(entity){
        this._entity = entity;
        this._currentState = null;
        this._transitions = [];
        this._anyTransitions = [];
        this._currentTransitions = [];
        this._emptyTransitions = [];
    }

    Tick(){
        // console.log('Ticking machine');
        let transition = this.GetTransition();
        if( transition ){
            this.SetState(transition.To);
        }

        if(!this._currentState){
            console.log('Current state not found');
            return;
        }

        this._currentState.Tick();
    }

    SetState(state){
        // console.log('SETTING STATE');
        if (state == this._currentState){
            // console.log('BUT NOT REALLY');
            return;
        }

        if(this._currentState && this._currentState.OnExit){
            this._currentState.OnExit();
        }

        this._currentState = state;

        if(this._entity){
            // console.log('CURRENT STATE1: ', this._entity.memory.currentState)
            this._entity.memory.currentState = state;
            // console.log('CURRENT STATE2: ', this._entity.memory.currentState)
        }

        this._currentTransitions = [];
        let type = this._currentState.constructor.name;
        if(this._transitions[type]){
            this._currentTransitions = this._transitions[type];
        }

        if(this._currentState.OnEnter){
            this._currentState.OnEnter();
        }
    }

    AddTransition(from, to, predicate){

        let type = from.constructor.name;
        
        if(!this._transitions[type]){
            this._transitions[type] = [];
        }

        this._transitions[type].push(new Transition(to, predicate));

    }

    AddAnyTransition(to, predicate){

        this._anyTransitions.push(new Transition(to, predicate));

    }

    GetTransition(){
        for(let transition of this._anyTransitions){
            if(transition.Condition()){
                return transition;
            }
        }

        for(let transition of this._currentTransitions){
            if(transition.Condition()){
                return transition;
            }
        }

        return null;
    }

}

class Transition {
    constructor(to, condition){
        this.Condition = condition;
        this.To = to;
    }
}

module.exports=StateMachine;