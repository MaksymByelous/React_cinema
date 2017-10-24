import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Composer from './';
import { options } from '../../containers/App';

Enzyme.configure({ adapter: new Adapter() });

const { firstName, lastName, avatar } = options;
const message = 'hi!';
const state = {
    textAreaValue:     '',
    avatarBorderColor: '#000'
};
const mutatedState = {
    textAreaValue:     message,
    avatarBorderColor: '#000'
};

const result = mount(
    <Composer
        createPost = { () => null }
        handleAreaCopy = { () => null }
    />,
    {
        context: {
            firstName,
            lastName,
            avatar
        }
    }
);

describe('Composer:', () => {
    test('should have 1 section element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 input element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('should have textarea empty string', () => {
        expect(result.find('textarea').text()).toEqual('');
    });

    test('should respond to state change', () => {
        result.setState(() => ({
            textAreaValue: message
        }));

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toEqual(message);

        result.setState(() => ({
            textAreaValue: ''
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toEqual('');

    });

    test('component state and textarea value reflect changes in input', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message
            }
        });
        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toEqual(message);

    });

    test('component state and textarea value reflect changes if submit', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(state);

    });

});
