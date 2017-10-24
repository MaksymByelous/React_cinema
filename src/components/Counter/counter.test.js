import React from 'react';
import dom from 'react-test-renderer';
import Counter from './';

const renderTree = dom.create(
    <Counter count = { 3 } />
).toJSON();

test(
    'counter should correspond to snapshot', () => {
        expect(renderTree).toMatchSnapshot();
    }
);
