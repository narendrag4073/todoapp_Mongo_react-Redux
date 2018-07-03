import * as types from './type'
import map from 'lodash/map'
import remove from 'lodash/remove'
import axios from 'axios'


export function getTodoList() {
    return (dispatch) => {
        axios.get(`/api`)
            .then(res => {
                    dispatch({
                        type: types.UPDATE_TODO_LIST,
                        payload: res.data.data
                    })
                },rej => {
                    (console.warn(`Couldn't fetch data, ${rej}`))
                })
    }
}

export function addNewTodo(todoTask) {
    return (dispatch, getState) => {
        axios.post(`/api` , {
            action: "add",
            task: todoTask
        })
            .then(res => {
                if (res.data.error) {
                    return (console.warn(res.data.error))
                }

                // We only received currently added data back
                let todos = getState().todoList.todos
                todos.push(res.data)
                dispatch(updateTodoList(todos))
                dispatch({
                    type: types.DISPLAY_INPUT_FILED,
                    payload: false
                })
            }, rej => console.warn(`Couldn't add new task, ${rej}`))
    }
}

export function toggleTodoState(todoId, todoState) {
    return (dispatch, getState) => {
        axios.post(`/api`, {
            action: "update",
            id: todoId,
            completed: !todoState
        })
            .then(res => {

                if (res.data.error) {
                    return (console.warn(res.data.error))
                }
                let todos = getState().todoList.todos
                let resTodo = res.data
                let updatedTod = map(todos, todo => {
                    if (todo._id == resTodo._id) {
                        todo.completed = resTodo.completed
                    }
                    return todo
                })
                dispatch(updateTodoList(updatedTod))
            }, rej => console.warn(`Couldn't update task status, ${rej}`))
    }
}


export function removeTask(todoId) {
    return (dispatch, getState) => {
        axios.post(`/api`, {
            action: 'remove',
            id: todoId
        })
            .then(res => {
                if (res.data.error) {
                    return (console.warn(res.data.error))
                }
                let todos = getState().todoList.todos
                let newTodos = remove(todos, todo => {
                    return todo._id !== res.data.todoId})
                dispatch(updateTodoList(newTodos))
            },rej => {
                (console.warn(`Couldn't remove task, ${rej}`))
            })
    }
}

export function updateTodoState(todoId, todo) {
    return (dispatch, getState) => {
        axios.post(`/api`, {
            action: "update",
            id: todoId,
            todo
        })
            .then(res => {
                debugger;
                if (res.data.error) {
                    return (console.warn(res.data.error))
                }
                let todos = getState().todoList.todos
                let resTodo = res.data
                let updatedTod = map(todos, todo => {
                    if (todo._id == resTodo._id) {
                        todo = resTodo
                    }
                    return todo
                })
                dispatch(updateTodoList(updatedTod));
                dispatch(editTask({isEdit : false}));
            }, rej => console.warn(`Couldn't update task status, ${rej}`))
    }
}

export function updateTodoList(todos) {
    return({
        type: types.UPDATE_TODO_LIST,
        payload: todos
    })
} 
export function editTask(todo) {
    return{
        type: types.EDIT_TODO,
        payload: todo
    }
} 

export function displayInputField(value) {
    return({
        type: types.DISPLAY_INPUT_FILED,
        payload: value
    })
}
export function openAddTodo(){
    return({
        type: types.DISPLAY_ADD_TODO_FORM,
        payload: true
    })
}