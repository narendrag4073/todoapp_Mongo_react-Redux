import { combineReducers } from 'redux'

import app from './App'
import header from './Header'
import todoList from './TodoList'
import newTodo from './NewTodo'
import editTodo from './EditTodo'


const rootReducer = combineReducers({
    app,
    header,
    todoList,
    newTodo,
    editTodo
})

export default rootReducer
