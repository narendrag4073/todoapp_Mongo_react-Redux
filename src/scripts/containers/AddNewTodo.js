import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { addNewTodo, displayInputField } from '../actions/index'


class AddNewTodo extends Component {

    constructor(props){
        super(props)
    }

    render() {
        const newTodo = this.props.newTodo
        return (
           <section className="add-new-todo">
               {newTodo.add ?
                   <div className="task-input-container">
                       <span className="plus-sign">
                           {newTodo.labelAdd}
                       </span>
                       <span className="task-input">
                           <form onSubmit={(e) =>this.addNewTodo(e)}>
                                <input
                                    ref="newTodo"
                                    placeholder={newTodo.placeholder}
                                    autoFocus={true}
                                />
                           </form>
                       </span>
                   </div>
               :
                   <div
                       className="plus-sign plus-sign-full"
                       onClick={this.props.displayInputField}
                   > <span>{newTodo.labelAdd}</span></div>
               }

           </section>
        )
    }

    addNewTodo(e, newTodo) {
        e.preventDefault()
        this.props.addNewTodo(this.refs['newTodo']['value'])
        this.refs['newTodo']['value'] = '' // reset the value
    }
}

function mapStateToProps(appState){
    return { newTodo: appState.newTodo}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addNewTodo, displayInputField}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AddNewTodo)
