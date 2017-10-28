// Core
import React, { Component } from 'react';
// import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
// cinema
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

    _addToMy (film) {
        this.setState(({ favorites }) => ({
            favorites: [film, ...favorites]
        }));
    }

    render () {
        const { details, favorites, title, overview, posterPath } = this.state;
        const showCinemaDetails = details
            ? <CinemaDetails
                addToMy = { this.addToMy }
                closeDetails = { this.closeDetails }
                overview = { overview }
                posterPath = { posterPath }
                title = { title }
            />

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
