import React, { Component } from 'react';
import Styles from './styles.scss';
import AppStyles from '../../containers/App/styles.scss';
import { func } from 'prop-types';
import Cinema from '../../components/Cinema';


const apiNew = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US';
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US';

export default class CinemaList extends Component {
    static contextTypes = {
    }
    static propTypes = {
        getFilms:   func.isRequired,
        getLatest:  func.isRequired,
        getPopular: func.isRequired
    }
    constructor () {
        super();
        this.getFilms = this._getFilms.bind(this);
        this.getLatest = this._getLatest.bind(this);
        this.getPopular = this._getPopular.bind(this);
    }

    state = {
        films: []
    }

    _getFilms (direction) {
        fetch(direction, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('post was not get');
                }

                return response.json();
            })
            .then(({ results }) => {
                this.setState(() => ({
                    films: results
                }));
            })
            .catch(({ massage }) => console.log(massage));
    }

    _getLatest () {
        return this.getFilms(apiNew);
    }
    _getPopular () {
        return this.getFilms(apiPopular);
    }

    render () {
        const { films } = this.state;

        return (
            <div className = { Styles.CinemaListWrapper }>
                <div className = { Styles.btnDirections }>
                    <button onClick = { this.getLatest }> Latest </button>
                    <button onClick = { this.getPopular }>Popular</button>
                </div>
                <div className = { AppStyles.content }>
                    <section className = { Styles.CinemaList }>
                        {films.map( function( {
                            title, id, overview, poster_path, release_date, vote_average
                        } ) {
                            return <Cinema
                                id = { id }
                                overview = { overview }
                                posterPath = { poster_path }
                                releaseDate = { release_date }
                                title = { title }
                                voteAverage = { vote_average }
                            />;
                        })
                        }
                    </section>
                </div>
            </div>
        );
    }
}
