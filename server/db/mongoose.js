var mongoose = require('mongoose')

var { CONST } = require('./../constant')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/myalltodos')

console.log('****** CONNECTING TO DB ******')
console.log('mongodb:' + CONST.DB + '/Todos')


module.exports = { mongoose }