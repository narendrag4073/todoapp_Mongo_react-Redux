import React, { Component } from 'react';
import moment from 'moment';
class TodoItem extends Component {

    constructor(props){
        super(props)
    }

    checkForAlert(todo){
        debugger;
        if(todo.remainder && moment(todo.remainder).isAfter(new Date)){
            let interval = moment(todo.remainder).diff(moment(new Date()))
            setTimeout(()=>{
                    alert(`Todo Title is ${todo.title} and your task is ${todo.description}`);
            }, interval)
        }
       
    }
    render() {
        const todo = this.props.todo
        this.checkForAlert(todo);
        return (
            <tr className="bg-light-grey">
            <td>{this.props.index+1}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.remainder? moment(todo.remainder).format("dddd, MMMM Do YYYY, h:mm:ss a"): null}</td>
            <td>
                <button className="btn btn-success" onClick={this.props.editTask.bind(this, {...todo, isEdit:true })}><i className="glyphicon glyphicon-pencil"></i></button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={this.props.removeTask.bind(this, todo._id)}><i className="glyphicon glyphicon-remove"></i></button>
            </td>
            </tr>
        )

        
    }
}


export default TodoItem