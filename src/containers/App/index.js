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

const api = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=1';

// export const options = {
//     firstName: 'Max',
//     lastName:  'Bels',
//     avatar,
//     api:       `https://lab.lectrum.io/feed/${groupID}`
// };


export default class App extends Component {
    state = {
        films: []
    }
    constructor () {
        super();
        this.getFilms = this._getFilms.bind(this);
    }

    componentWillMount () {
        this.getFilms();
        console.log(this.state.films)
    }

    _getFilms () {
        fetch(api, {
            method: 'GET'
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('post was not get');
            }
            return response.data.results.json();
        })
            .then(({ data }) =>
                this.setState(() => ({
                    films: data
                }))
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
