import React from 'react';
import dom from 'react-test-renderer';
import Footer from './';

const renderTree = dom.create(
    <Footer />
).toJSON();

test(
    'counter should correspond to snapshot', () => {
        expect(renderTree).toMatchSnapshot();
    }
);
