import * as types from '../actions/type'


export default function(state=null, action) {

    switch (action.type) {
        case types.DISPLAY_INPUT_FILED:
            return Object.assign({}, state, {
                add: action.payload
            })
    }
    return state
}