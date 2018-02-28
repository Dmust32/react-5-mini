const initialState = { 
    currentValue: 0,
    futureValues: [],
    pastValues: []
 };
//ACTION TYPES
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const UNDO = 'UNDO';
const REDO = 'REDO';

export default function counter(state= initialState, action) {
    switch (action.type){
        case INCREMENT: 
            return{
                currentValue: state.currentValue + action.amount,
                futureValues:[],
                pastValues:[ state.currentValue, ...state.pastValues ] 
            };
        case DECREMENT:
            return{
                currentValue: state.currentValue - action.amount,
                futureValues: [],
                pastValues: [state.currentValue, ...state.pastValues]
            };
        case UNDO:
            return{
                currentValue: state.pastValues[0],
                futureValues: [state.currentValue, ...state.futureValues],
                pastValues: state.pastValues.slice(1, state.pastValues.length)
            }
        case REDO:    
            return{
                currentValue: state.futureValues[0],
                futureValues: state.futureValues.slice (1, state.futureValues.length),
                pastValues: [state.currentValue, ...state.pastValues]
            }
        default:
            return state

    }
}

export function increment(amount) {
    return {amount, type: INCREMENT}
}

export function decrement(amount) {
    return { amount, type: DECREMENT}
}

export function undo(){
    return {type: UNDO}
}

export function redo(){
    return {type: REDO}
}