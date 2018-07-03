import * as types from '../actions/type'


export default function(state=null, action) {

    switch (action.type) {

        case types.TOGGLE_TODO_STATE:
            return Object.assign({}, state, {
                todos:  action.payload
            })

        case types.UPDATE_TODO_LIST:
            return Object.assign({}, state, {
                todos: action.payload
            })
    }

    return state
}