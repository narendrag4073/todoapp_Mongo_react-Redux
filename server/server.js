const express = require('express')
const fallback = require('express-history-api-fallback')
const path = require('path')
const bodyParser = require('body-parser')
var favicon = require('serve-favicon')


const app = express()
app.use(bodyParser.json())
//app.use(favicon(path.join(__dirname, 'favicon.ico')));

const { Db } = require('./queries/mongoose-queries')

app.get('/api', (req, res) => {
    Db.getTodos()
        .then(data => {
            res.send({data})
        }, error => {
            res.status(400).send(error)
        })
})

app.post('/api', (req, res) => {

    const actions = ['add', 'remove', 'update']

    if (req.body.action === undefined) {
        return res.status(400).send(`Must provide action. Accepted actions are ${actions}` )
    }

    switch (req.body.action) {
        case 'add':
            return addTodo(req.body, res)
        case 'remove':
            return removeTodo(req.body, res)
        case 'update':
            return updateTodo(req.body, res)
        default:
            return res.status(400).send(`Must provide action. Accepted actions are ${actions}` )
    }
})


if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./../webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
}

else {
    app.use(express.static('public'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
        app.use(fallback('index.html', { root:  __dirname + '../public' }))
    })
}

app.listen(process.env.PORT || 8008, () => console.log(`Listening on port 8008`));


/************************************************
 * Post Event Handlers
 ***********************************************/

function addTodo(reqBody, res) {
    if (reqBody.task.title === undefined || reqBody.task.title === "") {
        return res.send({ error: 'The action "add" must have a task'})
    }

    Db.addTodo(reqBody.task)
        .then(response => {
            return res.send(response)
        }, error => {
            return res.status(400).send(error)
        })
}

function removeTodo(reqBody, res) {
    if (reqBody.id === undefined || reqBody.id == "") {
        return res.send({ error: 'The action "remove" must have a id'})
    }

    Db.removeTodo(reqBody.id)
        .then(response => {
            if (response.result.ok === 1) {
                return res.send({todoId:reqBody.id})
            }
            return res.status(400).send(`Wasn't able to remove the task`)
        }, error => {
            return res.status(400).send(error)
        })
}

function updateTodo(reqBody, res) {

    if (reqBody.id === undefined || reqBody.id === "") {
        return res.send({ error: 'The action "update" must have id and completed'})
    }

    Db.updateTodo(reqBody.id, reqBody.todo)
        .then(data => {
            res.send(data)
        }, err => {
            res.status(400).send(err)
        })
}

module.exports = {app}