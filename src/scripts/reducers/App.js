import * as types from '../actions/type'


export default function(state=null, action) {

    switch (action.type) {

        case types.GET_TODO_LIST:
            return Object.assign({}, state, {
                todos: action.payload
            })
    }

    return state
}