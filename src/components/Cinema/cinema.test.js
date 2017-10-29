import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cinema from './';
import { openDetails } from './';

Enzyme.configure({ adapter: new Adapter() });
const openFunc = openDetails;
const result = mount(
    <Cinema/>,
    {}
);

describe('Cinema:', () => {
    test('should have image element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('openDetails should be function', () => {
        expect(typeof openFunc).toBe('function');
    });

});