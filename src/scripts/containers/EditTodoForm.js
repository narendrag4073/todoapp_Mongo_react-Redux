import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { updateTodoState, editTask, displayInputField } from '../actions/index'
import DatePicker from 'react-datepicker';
import moment from 'moment';
//import 'react-datepicker/dist/react-datepicker.css';


class EditTodoForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            discription: '',
            remainder: null
        }
    }
    componentDidMount(){
        
        this.setState(this.props.editTodo);
    }
    componentWillReceiveProps(newProp, preProp){
        this.setState(newProp.editTodo);
    }
    getErrorMsg(key){
        if(key + 'Error'){
            return(
                <div className="label label-danger">{this.state[key+'Error']}</div>
            )
        }
    }
    handeleFormSubmit(e){
        e.preventDefault();
        if(!this.state.title){
            this.setState({'titleError': 'Please Enter Title Of Todo', descriptionError: null});
        } else if(!this.state.description){
            this.setState({'descriptionError': 'Please Enter Description Of Todo', titleError: null});
        } else {
            this.props.updateTodoState(this.state._id , this.state);
        }
        
    }
    render() {
        debugger;
        if(this.props.editTodo.isEdit){
            let remainder = this.state.remainder ? moment(this.state.remainder): null
        return (
           <section className="add-new-todo col-md-12 pb-10">
            <form 
                className="fc-black fc-black bg-light-grey col-md-12  pb-10" 
                onSubmit={(e)=>this.handeleFormSubmit(e)}>
                <label className="pb-10 pt-10" > Title</label>
                {this.getErrorMsg('title')}
                <input 
                    type="text"
                    name="title"
                    className="form-control" 
                    value={this.state.title}
                    onChange={(e)=>this.setState({ title: e.target.value })}
                />
                
                <label className="pb-10 pt-10"> Description</label>
                {this.getErrorMsg('description')}
                <textarea 
                    type="text"
                    className="form-control" 
                    name="description" 
                    value={this.state.description}
                    onChange={(e)=>this.setState({ description: e.target.value })}
                />
                
                <label className="pb-10 pt-10">Remainder</label>
                    <DatePicker
                    selected={remainder}
                    onChange={(val)=>this.setState({remainder: new Date(val)})}
                    showTimeSelect
                    className="mb-10 form-control"
                    timeIntervals={1}
                    dateFormat="LLL" />
                <span className="pl-5 pr-5"><input type="submit" className="btn btn-success" /></span>
                <span className="pl-5 pr-5"><button 
                    onClick={(e)=>{
                        e.preventDefault();
                        this.props.editTask({isEdit:false});
                    }}
                    className="btn btn-danger">Cancel</button></span>
            </form>
           </section>
        )
    }  else {
        return <div></div>
    }
}

    
}

function mapStateToProps(appState){
    return { editTodo: appState.editTodo}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateTodoState, editTask, displayInputField}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(EditTodoForm)
