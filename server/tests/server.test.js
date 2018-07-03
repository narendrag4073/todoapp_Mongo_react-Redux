const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const { ObjectID } = require('mongodb')

var mockTodos = [
    { _id: ObjectID("58863139d6166e3f70b7762d"), task: "First Todo",   completed: false },
    { _id: ObjectID("58863117d6166e3f70b7762b"), task: "Second Todo",  completed: true }
]

// lifecycle method
// Remove all database record before every test so that we have a clean database
beforeEach((done) => { // function with done argument
    Todo.remove({})  // Remove everything from Todo
        .then(() => {
            return Todo.insertMany(mockTodos)
        }).then(() => done())
})

/******************************************
 * ACTIONS
 *******************************************/

describe (`POST /api actions test`, () => {

    let errorMessage = 'Must provide action. Accepted actions are add,remove,update'
    it('should FAIL when an action is not sent', (done) => {
        request(app)
            .post('/api')
            .send()
            .expect(400)
            .expect(res => {
                expect(res.error.text).toBe(errorMessage)

            })
            .end((err, res) => {
                if (err) {
                    return (done(err))
                }
                done()
        })
    })


    it('should FAIL when an wrong action is sent', (done) => {
        request(app)
            .post('/api')
            .send()
            .expect(400)
            .expect(res => {
                expect(res.error.text).toBe(errorMessage)
            })
            .end((err, res) => {
                if (err) {
                    return (done(err))
                }
                done()
            })
    })
})


/******************************************
 * ACTION: add
 *******************************************/

describe(`POST /api with action "add"`, () => {

    it('should create a new todo task', (done) => {
        let todo = {
            action: "add",
            task: "Task added via test suite"
        }

        request(app)
            .post('/api')
            .send(todo)
            .expect(200)
            .expect((res) => {
                // Asserting that we get proper response
                expect(res.body.task).toBe(todo.task)
            })
            .end((err, res) => {
                if (err) {
                  return done(err)
                }
                // Asserting that the data did get save in db
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3)
                    expect(todos[2].task).toBe(todo.task)
                    done()
                }).catch((e) => done(e))
            })
    })

    it('Should NOT create a todo with an task text body data', (done) => {
        let task = {
            action: "add",
            task: ""
        }

        let error = 'The action "add" must have a task'
        request(app)
            .post('/api')
            .send(task)
            .expect(200)
            .expect((res) => {
                expect(res.body.error).toBe(error)
            })
            .end((err, req) => {
                if (err) {
                    return done(err)
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e) => done(e))
            })
    })


    it('Should NOT create a todo with an task text body data', (done) => {
        let task = {
            action: "add",
            task: ""
        }

        let error = 'The action "add" must have a task'

        request(app)
            .post('/api')
            .send(task)
            .expect(200)
            .expect((res) => {
                expect(res.body.error).toBe(error)
            })
            .end((err, req) => {
                if (err) {
                    return done(err)
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e) => done(e))
            })
    })
})


/******************************************
 * ACTION: update
 *******************************************/

describe(`POST /api with action "update"`, () => {

    let error = 'The action "update" must have id and completed'

    // happy path
    it('Should update the status of todo task', (done) => {
        let updateTodo = {
            action: "update",
            id :'58863139d6166e3f70b7762d',
            completed: true
        }
        request(app)
            .post('/api')
            .send(updateTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.completed).toBe(updateTodo.completed)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })

    it('Should fail if the id or completed is not provided', (done) => {
        let updateTodo = {
            action: "update",
            id :'',
            completed: ''
        }
        request(app)
            .post('/api')
            .send(updateTodo)
            .expect(200)
            .expect(res => {
                expect(res.body.error).toBe(error)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})


/******************************************
 * ACTION: Remove
 *******************************************/

describe(`POST /api with action "remove"`, () => {
    //
    let error = 'The action "remove" must have a id'

    // happy path
    it('Should remove todo task', (done) => {
        let removeTodo = {
            action: "remove",
            id :'58863139d6166e3f70b7762d',
        }
        request(app)
            .post('/api')
            .send(removeTodo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todoId).toBe(removeTodo.id)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })

    it('Should fail if the id is not provided', (done) => {
        let removeTodo = {
            action: "remove",
            id :"",
        }
        request(app)
            .post('/api')
            .send(removeTodo)
            .expect(200)
            .expect(res => {
                expect(res.body.error).toBe(error)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done()
            })
    })
})


/******************************************
 * GET TODOS
 *******************************************/

describe('GET /api', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/api')
            .send()
            .expect(200)
            .expect(res => {
                expect(res.body.data.length).toBe(2)
            })
            .end(done)
    })
})