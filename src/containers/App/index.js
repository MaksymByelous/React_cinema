// Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CinemaList from '../../components/CinemaList';
import CinemaDetails from '../../components/CinemaDetails';
import Favorites from '../../components/Favorites';
import { getUniqueID } from '../../helpers';

export default class App extends Component {

    constructor () {
        super();
        this.showDetails = this._showDetails.bind(this);
        this.closeDetails = this._closeDetails.bind(this);
        this.addToMy = this._addToMy.bind(this);
        this.delFromMy = this._delFromMy.bind(this);
        this.handleCinemaDetailsAppear = this._handleCinemaDetailsAppear.bind(this);
        this.handleCinemaDetailsDisappear = this._handleCinemaDetailsDisappear.bind(this);
        this.checkFavorites = this._checkFavorites.bind(this);
    }
    state = {
        details:    false,
        favorites:  [],
        overview:   '',
        posterPath: '',
        title:      ''
    }
    _showDetails (overview, posterPath, title) {
        this.setState(() => ({
            details: true,
            overview,
            posterPath,
            title
        }));
    }
    _closeDetails () {
        this.setState(() => ({
            details: false
        }));
    }
    _handleCinemaDetailsAppear (cinemaDetails) {
        fromTo(
            cinemaDetails,
            0.5,
            { x: -300, opacity: 0 },
            { x: 0, opacity: 1 }
        );
    }
    _handleCinemaDetailsDisappear (cinemaDetails) {
        fromTo(
            cinemaDetails,
            0.5,
            { x: 0, opacity: 1 },
            { x: -10000, opacity: 0 }
        );
    }

    _addToMy (film) {
        this.setState(({ favorites }) => ({
            favorites:  [film, ...favorites],
            isFavorite: true
        }));
    }
    _delFromMy (film) {

        this.setState(() => ({
            favorites: this.state.favorites.filter((item) =>
                film.title !== item.title
            ),
            isFavorite: false
        }));
    }

    _checkFavorites (title) {
        const list = this.state.favorites.filter((item) =>
            item.title === title
        );
        const status = list.length > 0 || false;

        return status;
    }

    render () {
        const { details, favorites, title, overview, posterPath } = this.state;
        const uniqID = getUniqueID(6);
        const isFav = this.checkFavorites(title);

        return (
            <div>
                <Header />

                <CinemaList showDetails = { this.showDetails } />
                <Transition
                    in = { details }
                    timeout = { 500 }
                    onEnter = { this.handleCinemaDetailsAppear }
                    onExit = { this.handleCinemaDetailsDisappear }>
                    <CinemaDetails
                        addToMy = { this.addToMy }
                        closeDetails = { this.closeDetails }
                        delFromMy = { this.delFromMy }
                        id = { uniqID }
                        isFav = { isFav }
                        overview = { overview }
                        posterPath = { posterPath }
                        title = { title }
                    />
                </Transition>
                <Favorites
                    delFromMy = { this.delFromMy }
                    favorites = { favorites }
                />
                <Footer />
            </div>
        );
    }
}
