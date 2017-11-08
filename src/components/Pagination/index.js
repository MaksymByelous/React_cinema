import React, { Component } from 'react';
import AppStyles from '../../containers/App/styles.scss';
import Styles from './styles.scss';
import { func, string, number } from 'prop-types';


export default class Pagination extends Component {
    static propTypes = {
        base:            string.isRequired,
        handlePageClick: func.isRequired,
        totalPages:      number.isRequired
        // favorites: array.isRequired
    }

    constructor () {
        super();
        this.handlePageClick = this._handlePageClick.bind(this);
    }

    _handlePageClick (e) {
        this.props.handlePageClick(e.target.innerHTML);
    }

    render () {
        const { totalPages } = this.props;
        const pages = Array(totalPages).fill().map((value, index) =>
            <div className = { Styles.flexPage } key = { index } onClick = { this.handlePageClick }> {index + 1} </div>
        );

        return (
            <div className = { Styles.pagination }>
                <div className = { AppStyles.content }>
                    <div className = { Styles.flexContainer }>
                        { pages }
                    </div>
                </div>
            </div>
        );
    }
}
