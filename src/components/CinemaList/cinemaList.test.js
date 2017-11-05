import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CinemaList from './';
import { getLatest } from './';

Enzyme.configure({ adapter: new Adapter() });

const state = {
    base: 'popular'
};

const result = shallow(
    <CinemaList />,
    {}
);

describe('CinemaList:', () => {
    test('should change state details to latest', () => {
        result.instance().getLatest();
        expect(result.state().base).toEqual('latest');
    });

});
