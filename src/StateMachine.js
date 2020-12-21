class StateMachine {
    
    constructor(state, transitions) {
        this.state = state;
        this.transitions = transitions;
    }

    dispatch(scope, actionName, ...payload) {

        const actions = this.transitions[this.state];
        const action = actions[actionName];

        if(action){
            action.apply(scope, payload);
        }

    }

    changeState(newState, ...payload) {
        
        if(this.transitions[this.state].beforeChange){
            this.transitions[this.state].beforeChange(newState);
        }

        let previousState = this.state;
        this.state = newState;

        if(this.transitions[this.state].onChange){
            this.transitions[this.state].onChange(previousState, newState);
        }

        if(this.transitions.onAnyChange){
            this.transitions.onAnyChange(previousState, newState, ...payload);
        }

    }

}

module.exports = StateMachine;