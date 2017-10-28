import React, { Component } from 'react';
import Styles from './styles.scss';
// import { string, number } from 'prop-types';
import { string } from 'prop-types';

export default class Cinema extends Component {

    static propTypes = {
        // id:          number.isRequired,
        // overview:    string.isRequired,
        posterPath: string.isRequired
        // releaseDate: string.isRequired,
        // title:      string.isRequired
        // voteAverage: number.isRequired
    }

    render () {
        const {
            // id,
            // overview,
            posterPath
            // releaseDate,
            // title
            // voteAverage
        } = this.props;

        return (
            <div className = { Styles.cinema }>
                {/* <h6>{ title }</h6> */}
                <img src = { `http://image.tmdb.org/t/p/w342${posterPath}` } />
            </div>
        );
    }
}
