import React from 'react';
import Styles from './styles.scss';
import { number } from 'prop-types';

const Counter = ({ count }) => (
    <section className = { Styles.counter }> Posts count: {count}</section>
);

Counter.propTypes = {
    count: number.isRequired
};

Counter.defaultProps = {
    count: 0
};

export default Counter;
