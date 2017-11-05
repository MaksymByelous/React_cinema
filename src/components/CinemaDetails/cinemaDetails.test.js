import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CinemaDetails from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(
    <CinemaDetails
        addToMy = { () => null }
        closeDetails = { () => null }
        overview = ''
        posterPath = ''
        title = ''
    />
);

describe('CinemaDetails:', () => {
    test('should have two buttons', () => {
        expect(result.find('button').length).toBe(2);
    });

});
