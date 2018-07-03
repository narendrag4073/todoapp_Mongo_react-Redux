import React, { Component } from 'react'
import { connect } from 'react-redux'
import {map, isEmpty} from 'lodash'

import { bindActionCreators } from 'redux'

import { toggleTodoState, removeTask, updateTodoState, editTask } from '../actions/index'
import TodoItem from '../components/TodoItem'


class TodoList extends Component {

    constructor(props){
        super(props)
    }
    
    render() {
        debugger;
        if(this.props.editTodo.isEdit){
            return<div></div>
        } else if(isEmpty(this.props.todoList.todos)){
            return<div className="col-md-12 text-center fs-20"><h1>Please Add Todos</h1></div>
        }
       return (
           <section className="todo-list col-md-12 mt-10">
            <table className="table table-hover tborder">
            <thead>
            <tr className="bg-dark-green">
                <th>S.No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Remainder</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            
            {this.props.todoList.todos.map((todo, i) => {
                
                return <TodoItem key={`item-id-${todo._id}`} index={i} {...this.props} todo={todo}/>
            })} 
            </tbody>
            </table>
        
           </section>
        )
    }
}

function mapStateToProps(appState){
    return { editTodo: appState.editTodo, todoList: appState.todoList}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({toggleTodoState, removeTask, updateTodoState, editTask}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
