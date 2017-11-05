import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './';
import { addToMy, closeDetails } from './';

Enzyme.configure({ adapter: new Adapter() });

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
        result.instance().addToMy(newMovie);
        expect(result.state().favorites.length).toBe(1);
    });

    test('should change state details to false', () => {
        result.instance().closeDetails();
        expect(result.state().details).toEqual(mutatedState.details);
    });

});
