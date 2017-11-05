import React, { Component } from 'react';
import Styles from './styles.scss';
import AppStyles from '../../containers/App/styles.scss';
import { array } from 'prop-types';


export default class CinemaList extends Component {
    static propTypes = {
        favorites: array.isRequired
    }

    render () {
        const { favorites } = this.props;
        const favoritesList = favorites.map(
            (data, index) =>
                <li key = { index }> { data.title } </li>
        );

        return (
            <div className = { Styles.favorites }>
                <div className = { AppStyles.content }>
                    <h3>My favorites</h3>
                    <ul>
                        { favoritesList }
                    </ul>
                </div>
            </div>
        );
    }
}
