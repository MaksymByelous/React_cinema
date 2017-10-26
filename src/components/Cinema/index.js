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
            <div className = { Styles.cinema }>
                <p>CINEMA</p>
            </div>
        );
    }
}
