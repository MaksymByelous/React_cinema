import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import Cinema from '../../components/Cinema';

export default class CinemaList extends Component {
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
            <section className = { Styles.CinemaList }>
                <h1>CINEMAList</h1>
                <Cinema />
            </section>
        );
    }
}
