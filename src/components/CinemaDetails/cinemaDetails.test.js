import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CinemaDetails from './';

Enzyme.configure({ adapter: new Adapter() });

const result = mount(
    <CinemaDetails />,
    {}
);

describe('CinemaDetails:', () => {
    test('should have two buttons', () => {
        expect(result.find('button')).toHaveLength(2);
    });

});