const { ObjectID } = require('mongodb')

const _ = require('lodash')
const { mongoose }  = require('./../db/mongoose') //required for promise to work
const { Todo } = require('./../models/todo')

var Db = {

    getTodos: function() {
        return new Promise((res, rej)=> {
            Todo.find({}, (err, todos)=> {
                if (err) {
                    return (rej(err))
                }
                return res(todos)
            })
        })
    },
    addTodo: function(task) {
        return new Promise((res, rej) => {
            const todo = new Todo({title: task.title, description: task.description, completed: false, remainder: task.remainder})
            todo.save()
                .then( doc => {
                    res(doc)
                }, err => {
                    rej(err.errors)
                })
        })
    },
    updateTodo: function(todoId, todo) {
        return new Promise((res, rej)=> {
            Todo.findOneAndUpdate({
                _id: new ObjectID(todoId)
            }, {
                $set: todo
            }, {
                new: true
            })
                .then(doc => {
                    res(doc)
                }, err => {
                    rej(err)
                })
            })
    },
    removeTodo: function(todoId) {
        return new Promise((res, rej) => {
            Todo.remove({_id: new ObjectID(todoId)})
                .then( doc => {
                    res(doc)
                }, err => {
                    rej(err.errors)
                })
        })
    }
}

module.exports = { Db }