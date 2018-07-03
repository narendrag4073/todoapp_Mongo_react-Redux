var mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        required: true,
    },
    remainder: {
        type: Date
    }
})

module.exports = { Todo }