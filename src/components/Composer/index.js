import React, { Component } from 'react';
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import { getUniqueID, getRandomColor } from '../../helpers';

export default class Composer extends Component {
    static contextTypes = {
        lastName:  PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        avatar:    PropTypes.string.isRequired
    }
    static propTypes = {
        createPost:     PropTypes.func.isRequired,
        handleAreaCopy: PropTypes.func.isRequired
    }
    constructor () {
        super();
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handletextAreaChange = this._handletextAreaChange.bind(this);
        this.handleKeyPress = this._handleKeyPress.bind(this);
    }

    state = {
        textAreaValue:     '',
        avatarBorderColor: '#000'
    }
    _handleKeyPress () {
        this.setState(() => ({
            avatarBorderColor: getRandomColor()
        }));
    }
    _handleSubmit (event) {
        event.preventDefault();
        const { textAreaValue } = this.state;

        if (!textAreaValue) {
            return;
        }

        this.props.createPost({
            _id:       getUniqueID(15),
            comment:   this.state.textAreaValue,
            firstName: this.context.firstName,
            lastName:  this.context.lastName,
            avatar:    this.context.avatar
        });

        this.setState(() => ({
            textAreaValue: ''
        }));
    }

    _handletextAreaChange (event) {
        const textAreaValue = event.target.value;

        this.setState(() => ({
            textAreaValue
        }));
    }
    render () {
        const { handleAreaCopy } = this.props;
        const { firstName, avatar } = this.context;
        const { textAreaValue, avatarBorderColor } = this.state;

        return (
            <section className = { Styles.composer }>
                <img
                    src = { avatar }
                    style = { { borderColor: avatarBorderColor } }
                />
                <form onSubmit = { this.handleSubmit } >
                    <textarea
                        placeholder = { `Whats on your mind, ${firstName} ` }
                        value = { textAreaValue }
                        onChange = { this.handletextAreaChange }
                        onCopy = { handleAreaCopy }
                        onKeyPress = { this.handleKeyPress }
                    />
                    <br />
                    <input type = 'submit' value = 'post' />
                </form>
            </section>
        );
    }
}
