// Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CinemaList from '../../components/CinemaList';
import CinemaDetails from '../../components/CinemaDetails';
import Favorites from '../../components/Favorites';


export default class App extends Component {

    constructor () {
        super();
        this.showDetails = this._showDetails.bind(this);
        this.closeDetails = this._closeDetails.bind(this);
        this.addToMy = this._addToMy.bind(this);
        this.handleCinemaDetailsAppear = this._handleCinemaDetailsAppear.bind(this);
        this.handleCinemaDetailsDisappear = this._handleCinemaDetailsDisappear.bind(this);
    }
    state = {
        details:    false,
        favorites:  [],
        overview:   'overview',
        posterPath: 'posterPath',
        title:      'hi max!'
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
            1,
            { x: -300, opacity: 0 },
            { x: 0, opacity: 1 }
        );
    }
    _handleCinemaDetailsDisappear (cinemaDetails) {
        fromTo(
            cinemaDetails,
            1,
            { x: 0, opacity: 1 },
            { x: -300, opacity: 0 }
        );
    }

    _addToMy (film) {
        this.setState(({ favorites }) => ({
            favorites: [film, ...favorites]
        }));
    }

    render () {
        const { details, favorites, title, overview, posterPath } = this.state;
        const showCinemaDetails = details
            ? <Transition
                appear
                in = { this.state.details }
                timeout = { 1000 }
                onEnter = { this.handleCinemaDetailsAppear }
                onExit = { this.handleCinemaDetailsDisappear } >
                <CinemaDetails
                    addToMy = { this.addToMy }
                    closeDetails = { this.closeDetails }
                    overview = { overview }
                    posterPath = { posterPath }
                    title = { title }
                />
            </Transition>

            : null;

        return (
            <div>
                <Header />
                <CinemaList showDetails = { this.showDetails } />
                { showCinemaDetails }
                <Favorites favorites = { favorites } />
                <Footer />
            </div>
        );
    }
}
