import React, { Component } from 'react'
import { connect } from 'react-redux'
import { displayInputField } from '../actions/index'
import { bindActionCreators } from 'redux'
class Header extends Component {

    constructor(props){
        super(props)
    }

    render() {
       return (
           <header className="header">
                <div className="col-md-12 pl-0 panel bg-grey">
                    <h2 className="col-md-10 pt-10 ">{this.props.header.title}</h2>
                    <a className="col-md-2 pt-20 fs-20 cw" onClick={(e)=>{
                            this.props.displayInputField(true)
                    }}> Add Todo</a>
               </div>
           </header>
        )
    }
}

function mapStateToProps(appState){
    return {header: appState.header}
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ displayInputField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
