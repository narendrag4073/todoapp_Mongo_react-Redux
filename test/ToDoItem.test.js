/***
 * TODO: Need to get better test suite so that the actions can be tested as well
 */
import React from 'react';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';

import TodoItem from '../src/scripts/components/TodoItem';


describe("TodoItem", function() {

    const props = {
        toggleTodoState: () => {},
        removeTask: () => {},
        todoList: {
            labelDel: 'x'
        }
    }
    const todo = {
        _id: 'a1',
        completed: true,
    }
    const wrapper = shallow(<TodoItem {...props} todo={todo} />)

    it("Renders without exploding", () => {
        expect(wrapper.length).toEqual(1)
    })

    it("contains proper className", function() {
        expect(wrapper.find(".todo-item").length).toEqual(true)
    })

})