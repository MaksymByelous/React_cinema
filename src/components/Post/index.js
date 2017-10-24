import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles.scss';
import PropTypes from 'prop-types';
import like from '../../theme/assets/like.png';


export default class Post extends Component {
    static propTypes = {
        _id:            PropTypes.string.isRequired,
        avatar:         PropTypes.string.isRequired,
        comment:        PropTypes.string.isRequired,
        created:        PropTypes.number.isRequired,
        deletePost:     PropTypes.func.isRequired,
        firstName:      PropTypes.string.isRequired,
        handleAreaCopy: PropTypes.func.isRequired,
        lastName:       PropTypes.string.isRequired,
        like:           PropTypes.string.isRequired,
        makePostLike:   PropTypes.func.isRequired
    }
    static contextTypes = {
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired
    }
    constructor () {
        super();
        this.deletePost = this._deletePost.bind(this);
        this.makeLikePost = this._makeLikePost.bind(this);
    }
    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    _deletePost () {
        this.props.deletePost(this.props._id);
    }
    _makeLikePost () {
        this.props.makePostLike(this.props._id);
    }

    render () {
        const {
            avatar,
            comment,
            created,
            firstName,
            handleAreaCopy,
            lastName
        } = this.props;
        const {
            firstName: ownFirstName,
            lastName: ownLastName
        } = this.context;
        const likeBack = {
            backgroundImage:    'url(' + like + ')',
            backgroundPosition: 'left top'
        };
        const ableToDelete = `${ownFirstName} ${ownLastName}` === `${firstName} ${lastName}`
            ? <div className = { Styles.delBtn }><input type = 'button' value = 'del' onClick = { this.deletePost } /></div>
            : null;


        return (
            <section className = { Styles.post } >
                <div className = { Styles.head }>
                    <img src = { avatar } />
                    <div className = { Styles.name } >
                        <div> { firstName } { lastName } </div>
                        <div className = { Styles.time } >
                            {moment.unix(created).format('MMMM D h:mm:ss a')}
                        </div>
                    </div>
                </div>
                <div className = { Styles.text } onCopy = { handleAreaCopy }>
                    { comment }
                </div>
                <div className = { Styles.likeBtn }>
                    <div style = { likeBack } onClick = { this.makeLikePost } />
                </div>
                {ableToDelete}
            </section>
        );
    }
}
