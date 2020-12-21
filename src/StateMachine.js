class StateMachine {
    
    constructor(state, transitions) {
        this.state = state;
        this.transitions = transitions;
    }

    dispatch(actionName, ...payload) {

        const actions = this.transitions[this.state];
        const action = actions[actionName];

        if(action){
            action.apply(this, ...payload);
        }

    }

    changeState(newState) {
        
        if(this.transitions[this.state].beforeChange){
            this.transitions[this.state].beforeChange(newState);
        }

        let previousState = this.state;
        this.state = newState;

        if(this.transitions[this.state].onChange){
            this.transitions[this.state].onChange(previousState);
        }

    }

}