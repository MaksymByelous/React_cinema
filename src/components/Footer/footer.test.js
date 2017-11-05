import React from 'react';
import dom from 'react-test-renderer';
import Footer from './';

const renderTree = dom.create(
    <Footer />
).toJSON();

test(
    'footer should correspond to snapshot', () => {
        expect(renderTree).toMatchSnapshot();
    }
);
