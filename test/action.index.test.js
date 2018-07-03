import expect from 'expect'


import * as actions from '../src/scripts/actions/index'
import * as types from '../src/scripts/actions/type'


describe('Actions Test Suite', () => {

    it('displayInputField should return proper type and payload ', () => {
        const shouldReturn = {
            type: types.DISPLAY_INPUT_FILED,
            payload: true,
        }
        expect(actions.displayInputField()).toEqual(shouldReturn)
    })

    it('updateTodoList should return proper type and payload ', () => {
        const payload = {foo: 'bar'}
        const shouldReturn = {
            type: types.UPDATE_TODO_LIST,
            payload,
        }
        expect(actions.updateTodoList(payload)).toEqual(shouldReturn)
    })

    /***
     * The Async action unit test is not working!!!
     */
    it('getTodoList should return proper type and payload ', () => {
        const payload = {foo: 'bar'}
        const getState = () => ({users: 'foo'})
        const dispatch = expect.createSpy()
        const shouldReturn = {
            type: types.UPDATE_TODO_LIST,
            payload
        }

    })

})