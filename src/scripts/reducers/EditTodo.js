import * as types from '../actions/type'


export default function(state={}, action) {
    console.log(action);
    switch (action.type) {
        case types.EDIT_TODO:
            return action.payload;
    }
    return state
}