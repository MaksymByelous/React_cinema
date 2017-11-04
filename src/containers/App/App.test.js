import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './';
import { addToMy, closeDetails } from './';

Enzyme.configure({ adapter: new Adapter() });

// const { firstName, lastName, avatar } = options;
const newMovie = { title: 'mike' };
const state = {
    details:    true,
    favorites:  [],
    overview:   'overview',
    posterPath: 'posterPath',
    title:      'hi max!'
};
const mutatedState = {
    details:    false,
    favorites:  [{ title: 'mike' }],
    overview:   'overview',
    posterPath: 'posterPath',
    title:      'hi max!'
};

const result = mount(
    <App />,
    {}
);

describe('App:', () => {
    test('should have CinemaList element', () => {
        expect((result.find('CinemaList')).length).toBe(2);
    });

    test('should add one movie to favorites', () => {
        function addOneToFavorites () {
            addToMy(newMovie);
        }
        addOneToFavorites();
        expect(this.state.favorites.length).toBe(1);
    });

    test('should change state details to false', () => {
        function changeDetailsStateToFalse () {
            closeDetails();
        }
        changeDetailsStateToFalse();
        expect(result.state()).toEqual(mutatedState);
    });

    // test('should have valid initial state', () => {
    //     expect(result.state()).toEqual(state);
    // });

    // test('should have textarea empty string', () => {
    //     expect(result.find('textarea').text()).toEqual('');
    // });

    // test('should respond to state change', () => {
    //     result.setState(() => ({
    //         textAreaValue: message
    //     }));

    //     expect(result.state()).toEqual(mutatedState);
    //     expect(result.find('textarea').text()).toEqual(message);

    //     result.setState(() => ({
    //         textAreaValue: ''
    //     }));

    //     expect(result.state()).toEqual(state);
    //     expect(result.find('textarea').text()).toEqual('');

    // });

    // test('component state and textarea value reflect changes in input', () => {
    //     result.find('textarea').simulate('change', {
    //         target: {
    //             value: message
    //         }
    //     });
    //     expect(result.state()).toEqual(mutatedState);
    //     expect(result.find('textarea').text()).toEqual(message);

    // });

    // test('component state and textarea value reflect changes if submit', () => {
    //     result.find('form').simulate('submit');

    //     expect(result.state()).toEqual(state);

    // });

});