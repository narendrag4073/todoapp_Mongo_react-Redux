import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { getTodoList } from '../actions/index'

import Header from '../containers/Header'
import TodoList from '../containers/TodoList'
import AddNewTodo from '../containers/AddNewTodo'
import AddNewTodoForm from '../containers/AddNewTodoForm';
import EditTodoForm from '../containers/EditTodoForm';

import './../../styles/style.scss'


class App extends Component {

    componentDidMount() {
        this.props.getTodoList()
    }

    render() {
        debugger;
        return (
            <div>
                <div className="content">
                    <Header />
                    <AddNewTodoForm />
                    <EditTodoForm/>
                    <TodoList />
                 </div>
            </div>
        )
    }
}

function mapStateToProps(appState){
    return { app: appState.app}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getTodoList}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
