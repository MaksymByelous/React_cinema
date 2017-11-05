import React, { Component } from 'react';
import Styles from './styles.scss';
import AppStyles from '../../containers/App/styles.scss';
import { string, func, bool } from 'prop-types';
import moonIcon from '../../theme/assets/moon-icon.png';

export default class CinemaDetails extends Component {

    static propTypes = {
        addToMy:      func.isRequired,
        closeDetails: func.isRequired,
        delFromMy:    func.isRequired,
        id:           string.isRequired,
        isFav:        bool.isRequired,
        overview:     string.isRequired,
        posterPath:   string.isRequired,
        title:        string.isRequired
    }

    constructor () {
        super();
        this.addToMy = this._addToMy.bind(this);
        this.delFromMy = this._delFromMy.bind(this);
    }
    _addToMy () {
        const myfilm = {
            id:    this.props.id,
            title: this.props.title
        };

        this.props.addToMy(myfilm);
    }
    _delFromMy () {
        const myfilm = {
            id:    this.props.id,
            title: this.props.title
        };

        this.props.delFromMy(myfilm);
    }

    render () {
        const { closeDetails, overview, posterPath, title, isFav } = this.props;
        const isPoster =
            posterPath.length > 0
                ? <img
                    src = { `http://image.tmdb.org/t/p/w342${posterPath}` }
                    onClick = { this.openDetails }
                />
                : moonIcon;
        const filmInMy = isFav
            ? <button onClick = { this.delFromMy }>Del to my</button>
            : <button onClick = { this.addToMy }>Add to my</button>;

        return (
            <section className = { Styles.cinemaDetails }>
                <div className = { AppStyles.content }>
                    <div className = { Styles.btnBlock }>
                        <button onClick = { closeDetails }> Close </button>
                        { filmInMy }
                    </div>
                    <div className = { Styles.flexWrap }>
                        <div className = { Styles.posterWrapper }>
                            { isPoster }
                        </div>
                        <div className = { Styles.textWrapper }>
                            <h3> { title } </h3>
                            <p> { overview } </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
