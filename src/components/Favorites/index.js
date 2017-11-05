import React, { Component } from 'react';
import Styles from './styles.scss';
import AppStyles from '../../containers/App/styles.scss';
import { array, func } from 'prop-types';


export default class CinemaList extends Component {
    static propTypes = {
        delFromMy: func.isRequired,
        favorites: array.isRequired
    }

    constructor () {
        super();
        this.delFromMy = this._delFromMy.bind(this);
    }

    _delFromMy (e) {
        const myfilm = {
            id:    undefined,
            title: e.target.value
        };

        this.props.delFromMy(myfilm);
    }

    render () {
        const { favorites } = this.props;
        const favoritesList = favorites.map(
            ({ id, title }) => (
                <li key = { id }> { title }
                    <button value = { title } onClick = { this.delFromMy }>Del</button>
                </li>
            )
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
