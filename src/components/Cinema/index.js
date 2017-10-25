import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';

export default class Cinema extends Component {
    static contextTypes = {

    }
    static propTypes = {

    }
    constructor () {
        super();
    }

    state = {

    }

    render () {

        return (
            <section className = { Styles.cinema }>
                <h1>CINEMA</h1>
            </section>
        );
    }
}
