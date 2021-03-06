import React, { Component } from 'react';
import Styles from './styles.scss';
import AppStyles from '../../containers/App/styles.scss';
import { func } from 'prop-types';
import Cinema from '../../components/Cinema';
import Pagination from '../../components/Pagination';
import { Icon } from 'react-fa';


const apiNew = 'https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=';
const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=';

export default class CinemaList extends Component {

    static propTypes = {
        showDetails: func.isRequired
    }

    constructor () {
        super();
        this.getFilms = this._getFilms.bind(this);
        this.getLatest = this._getLatest.bind(this);
        this.getPopular = this._getPopular.bind(this);
        this.loaderOn = this._loaderOn.bind(this);
        this.loaderOff = this._loaderOff.bind(this);
        this.handlePageClick = this._handlePageClick.bind(this);
    }

    state = {
        films:      [],
        base:       'latest',
        activePage: 1,
        totalPages: 0,
        loading:    false
    }

    componentWillMount () {
        this.getFilms(apiNew, 1);
    }
    _loaderOn () {
        this.setState(() => ({
            loading: true
        }));
    }
    _loaderOff () {
        this.setState(() => ({
            loading: false
        }));
    }
    _getFilms (direction, page) {
        this.loaderOn();
        fetch(direction + page, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('post was not get');
                }

                return response.json();
            })
            .then((response) => {
                this.setState(() => ({
                    totalPages: response.total_pages
                }));

                return response;
            })
            .then(({ results }) => {
                this.setState(() => ({
                    films: results
                }));
                this.loaderOff();
            })
            .catch(({ massage }) => console.error(massage));
    }

    _getLatest () {
        this.setState(() => ({
            base:       'latest',
            activePage: 1
        }));

        return this.getFilms(apiNew, 1);
    }
    _getPopular () {
        this.setState(() => ({
            base:       'popular',
            activePage: 1
        }));

        return this.getFilms(apiPopular, 1);
    }

    _handlePageClick (pageIndex) {
        if (this.state.base === 'latest') {
            this.getFilms(apiNew, pageIndex);
        } else {
            this.getFilms(apiPopular, pageIndex);
        }
    }

    render () {
        const { showDetails } = this.props;
        const { films, loading, totalPages, base } = this.state;
        const filmList = films.map(({ title, id, overview, poster_path }) =>
            <Cinema key = { id } overview = { overview } posterPath = { poster_path } showDetails = { showDetails } title = { title } />
        );
        const loader = loading
            ? <div className = { AppStyles.iconWrapper }>
                <Icon
                    spin
                    className = { AppStyles.blue }
                    name = 'refresh'
                    size = '5x'
                />
            </div>
            : null;

        return (
            <div className = { Styles.CinemaListWrapper }>
                <div className = { Styles.btnDirections }>
                    <button onClick = { this.getLatest }> Latest </button>
                    <button onClick = { this.getPopular }>Popular</button>
                </div>
                { loader }
                <div className = { AppStyles.content }>
                    <section className = { Styles.CinemaList }>
                        { filmList }
                    </section>
                </div>
                <Pagination base = { base } handlePageClick = { this.handlePageClick } totalPages = { totalPages } />
            </div>
        );
    }
}
