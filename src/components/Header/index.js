import React from 'react';
import Styles from './styles.scss';
import AppStyles from '../../containers/App/styles.scss';
import moonIcon from '../../theme/assets/moon-icon.png';

const Header = () => (
    <header>
        <div className = { AppStyles.content }>
            <div>
                <img src = { moonIcon } />
                <div className = { Styles.movies }>
                    Movies
                </div>
            </div>
        </div>
    </header>
);

export default Header;
