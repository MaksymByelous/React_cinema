// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import avatar from '../../theme/assets/avatar.jpg';
import Feed from '../../components/Feed';
import Catch from '../../components/Catch';

// cinema
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CinemaList from '../../components/CinemaList';
import CinemaDetails from '../../components/CinemaDetails';

const api = 'http://api.themoviedb.org/3/movie/now_playing?api_key=fe9fd28919b839033b4f477257b0ebd3&page=1';

// export const options = {
//     firstName: 'Max',
//     lastName:  'Bels',
//     avatar,
//     api:       `https://lab.lectrum.io/feed/${groupID}`
// };


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
    constructor () {
        super();
        this.getPost = this._getPost.bind(this);
    }

    componentWillMount () {
        this.getPost();
    }

    _getPost () {
        fetch(api, {
            method: 'GET'
        })
            .then((result) => {

                if (result.status !== 200) {
                    throw new Error('post was not get');
                }
                return result.json();
            })
            .then(({ data }) =>
                // this.setState(() => ({
                //     posts: data
                // })
                // )
                console.log(data)
            )
            .catch(({ massage }) => console.log(massage));
    }

    render () {
        return (
            <div>
                <Header />
                <CinemaList />
                <CinemaDetails />
                <Footer />

                {/* <Catch>
                    <Feed />
                </Catch> */}
            </div>
        );
    }
}
