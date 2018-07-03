/**
 * TODO:
 * The test in not entirely true. Need to get better test suite for testing actions
 */
import React from 'react';
import { connect } from 'react-redux';
import expect from 'expect';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';


import AddNewTodo from '../src/scripts/containers/AddNewTodo';

describe("AddNewTodo", () => {

    describe('dispatch', () => {
        const displayInputField = {type: null}
        const addNewTodo = {type: null}
        const mapDispatchToProps = (dispatch) => ({
            dispatchProp() {
                dispatch(displayInputField)
                dispatch(addNewTodo)
            },
        })
        const store = createMockStore()

        const ConnectedComponent = connect(undefined, mapDispatchToProps)(AddNewTodo)
        const component = shallowWithStore(<ConnectedComponent />, store)
        component.props().dispatchProp()

        it('works', () => {
            // expect(store.isActionDispatched(action)).toBe(true);
            expect(store.isActionDispatched(displayInputField)).toBe(true);
            expect(store.isActionDispatched(addNewTodo)).toBe(true);
        });
    });

})
