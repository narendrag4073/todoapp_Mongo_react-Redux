import React from 'react';
import { connect } from 'react-redux';
import expect from 'expect';
import { shallowWithState } from 'enzyme-redux';

import Header from '../src/scripts/containers/Header';

describe("Header", () => {

    const props = {
        title: "title"
    }
    const mapStateToProps = (state) => ({ state })
    const ConnectedComponent = connect(mapStateToProps)(Header)
    const component = shallowWithState(<ConnectedComponent />, props)

    it('Should render Header without exploding', () => {
        expect(component.length).toEqual(1)
    })

})