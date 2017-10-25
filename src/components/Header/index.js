import React from 'react';
import Styles from './styles.scss';
import moonIcon from '../../theme/assets/moon-icon.png';

const Header = () => (
    <header>
        <div className = { Styles.content }>
            <div className = { Styles.pullLeft }>
                <img src = { moonIcon } />
                <div className = { Styles.movies }>
                    Movies
                </div>
            </div>
            <div className = {Styles.login}>
                <span className = {Styles.account}> My account</span>
                <i/>
            </div>
        </div>
    </header>
);

export default Header;
