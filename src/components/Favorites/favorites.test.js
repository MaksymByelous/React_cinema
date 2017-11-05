import React from 'react';
import dom from 'react-test-renderer';
import Favorites from './';

const renderTree = dom.create(
    <Favorites favorites = { ['mike', 'jong'] } />
).toJSON();

test(
    'favorites should correspond to snapshot', () => {
        expect(renderTree).toMatchSnapshot();
    }
);
