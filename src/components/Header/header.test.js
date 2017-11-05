import React from 'react';
import dom from 'react-test-renderer';
import Header from './';

const renderTree = dom.create(
    <Header />
).toJSON();

test(
    'header should correspond to snapshot', () => {
        expect(renderTree).toMatchSnapshot();
    }
);
