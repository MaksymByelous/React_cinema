import React, { Component } from 'react';
import Styles from './styles.scss';
import AppStyles from '../../containers/App/styles.scss';
import { func } from 'prop-types';
import Cinema from '../../components/Cinema';


const apiNew = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US';
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US';

export default class CinemaList extends Component {

    static propTypes = {
        showDetails: func.isRequired
    }

    constructor () {
        super();
        this.getFilms = this._getFilms.bind(this);
        this.getLatest = this._getLatest.bind(this);
        this.getPopular = this._getPopular.bind(this);
    }

    state = {
        films: [],
        base:  'latest'
    }

    componentWillMount () {
        this.getLatest();
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
        this.setState(() => ({
            base: 'latest'
        }));

        return this.getFilms(apiNew);
    }
    _getPopular () {
        this.setState(() => ({
            base: 'popular'
        }));

        return this.getFilms(apiPopular);
    }

    render () {
        const { showDetails } = this.props;
        const { films } = this.state;
        const filmList = films.map(({ title, id, overview, poster_path }) =>
            <Cinema key = { id } overview = { overview } posterPath = { poster_path } showDetails = { showDetails } title = { title } />
        );

        return (
            <div className = { Styles.CinemaListWrapper }>
                <div className = { Styles.btnDirections }>
                    <button onClick = { this.getLatest }> Latest </button>
                    <button onClick = { this.getPopular }>Popular</button>
                </div>
                <div className = { AppStyles.content }>
                    <section className = { Styles.CinemaList }>
                        { filmList }
                    </section>
                </div>
            </div>
        );
    }
}
