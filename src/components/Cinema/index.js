import React, { Component } from 'react';
import Styles from './styles.scss';
import { string, func } from 'prop-types';

export default class Cinema extends Component {

    static propTypes = {
        overview:    string.isRequired,
        posterPath:  string.isRequired,
        showDetails: func.isRequired,
        title:       string.isRequired
    }

    constructor () {
        super();
        this.openDetails = this._openDetails.bind(this);
    }

    _openDetails () {
        this.props.showDetails(this.props.overview, this.props.posterPath, this.props.title);
    }

    render () {
        const { posterPath } = this.props;

        return (
            <div className = { Styles.cinema }>
                <img
                    src = { `http://image.tmdb.org/t/p/w342${posterPath}` }
                    onClick = { this.openDetails }
                />
            </div>
        );
    }
}
