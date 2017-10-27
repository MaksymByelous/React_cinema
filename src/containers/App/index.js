// Core
import React, { Component } from 'react';

// cinema
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CinemaList from '../../components/CinemaList';
import CinemaDetails from '../../components/CinemaDetails';


export default class App extends Component {
    // static childContextTypes = {
    //     firstName: string.isRequired,
    //     lastName:  string.isRequired,
    //     avatar:    string.isRequired,
    //     api:       string.isRequired
    // }
    // getChildContext () {
    //     return {
    //         firstName: options.firstName,
    //         lastName:  options.lastName,
    //         avatar:    options.avatar,
    //         api:       options.api
    //     };
    // }
    // constructor () {
    //     super();
    // }

    // state = {
    // }
    // componentWillMount () {
    // }

    render () {

        return (
            <div>
                <Header />
                <CinemaList />
                <CinemaDetails />
                <Footer />
            </div>
        );
    }
}
