class StateMachine {

    constructor(){
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
            return;
        }

        this._currentState.Tick();
    }

    SetState(state){
        if (state == this._currentState){
            return;
        }

        if(this._currentState && this._currentState.OnExit){
            this._currentState.OnExit();
        }

        this._currentState = state;

        this._currentTransitions = [];
        let type = typeof _currentState;
        if(this._transitions[type]){
            this._currentTransitions = this._transitions[type];
        }

        if(this._currentState.OnEnter){
            this._currentState.OnEnter();
        }
    }

    AddTransition(from, to, predicate){

        let type = typeof from;
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