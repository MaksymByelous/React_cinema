import React, { Component } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import Composer from '../Composer';
import Post from '../Post';
import Counter from '../Counter';
import Postman from '../Postman';
import Styles from './styles.scss';
import { string } from 'prop-types';
import avatar from '../../theme/assets/avatar.jpg';
import { fromTo } from 'gsap';

export default class Feed extends Component {
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired,
        api:       string.isRequired
    }
    constructor () {
        super();
        this.createPost = this._createPost.bind(this);
        this.getPost = this._getPost.bind(this);
        this.handleAreaCopy = this._handleAreaCopy.bind(this);
        this.deletePost = this._deletePost.bind(this);
        this.handleComposerAppear = this._handleComposerAppear.bind(this);
        this.handleCounterAppear = this._handleCounterAppear.bind(this);
        this.handlePostmanAppear = this._handlePostmanAppear.bind(this);
        this.handlePostmanDisappear = this._handlePostmanDisappear.bind(this);
        this.makePostLike = this._makePostLike.bind(this);
    }

    state = {
        posts:   [],
        postman: true
    }

    componentWillMount () {
        this.getPost();
        this.reetchPosts = setInterval(
            () => this.getPost(), 15000
        );
        this.postman = setInterval(
            () =>
                this.setState(() => ({
                    postman: false
                })
                ), 2500
        );
    }
    componentWillUnMount () {
        clearInterval(this.refetchPosts);
    }
    _handleComposerAppear (composer) {
        fromTo(
            composer,
            1,
            { y: -200, opacity: 0 },
            { y: 0, opacity: 1 }
        );
    }
    _handleCounterAppear (counter) {
        fromTo(
            counter,
            1,
            { x: -300, opacity: 0 },
            { x: 0, opacity: 1 }
        );
    }
    _handlePostmanAppear (postman) {
        fromTo(
            postman,
            1,
            { x: -300, opacity: 0 },
            { x: 0, opacity: 1, onComplete: () => setTimeout(this.handlePostmanDisappear, 2000) }
        );
    }
    _handlePostmanDisappear (postman) {
        fromTo(
            postman,
            2,
            { x: 0, opacity: 1 },
            { x: -300, opacity: 0 }
        );
    }

    _handleAreaCopy (event) {
        event.preventDefault();
    }
    _createPost (post) {
        const { api, firstName, lastName, avatar } = this.context;

        fetch(api, {
            method:  'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                avatar,
                comment: post.comment
            })
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('post was not created');
                }

                return response.json();
            })
            .then(({ data }) =>
                this.setState(({ posts }) => ({
                    posts: [data, ...posts]
                })
                )
            )
            .catch(({ massage }) => console.log(massage));
    }

    async _deletePost (_id) {
        try {
            const { api } = this.context;
            const response = await fetch(`${api}/${_id}`, {
                method: 'DELETE'
            });

            if (response.status !== 200) {
                throw new Error('post not deleted');
            }
            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post._id !== _id)
            }));
        } catch ({ message }) {
            console.log(message);
        }

    }
    // `src/theme/assets/like.png`
    // NEED TO EMPLEMENT LIKING!!!!!!!!!!!!!!!!!!!!!!!!!!!
    _makePostLike (_id) {
        console.log('liked');
        const { firstName, lastName } = this.context;
        fetch(`${this.context.api}/${_id}`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                firstName,
                lastName
            })
        });

    }


    _getPost () {
        fetch(this.context.api, {
            method: 'GET'
        })
            .then((result) => {
                if (result.status !== 200) {
                    throw new Error('post was not get');
                }


                return result.json();
            })
            .then(({ data }) =>
                this.setState(() => ({
                    posts: data
                })
                )
            )
            .catch(({ massage }) => console.log(massage));
    }

    render () {
        const { posts, postman } = this.state;
        const postList = posts.map(
            ({ comment, _id, avatar, created, firstName, lastName }) =>
                (
                    <CSSTransition
                        classNames = { {
                            appearActive: Styles.postAppearActive,
                            appear:       Styles.postAppear,
                            enterActive:  Styles.postEnterActive,
                            enter:        Styles.postEnter,
                            exitActive:   Styles.postDeleteActive,
                            exit:         Styles.postDelete
                        } }
                        key = { _id }
                        timeout = { { enter: 500, exit: 1000 } }>
                        <Post
                            _id = { _id }
                            avatar = { avatar }
                            comment = { comment }
                            created = { created }
                            deletePost = { this.deletePost }
                            firstName = { firstName }
                            handleAreaCopy = { this.handleAreaCopy }
                            key = { _id }
                            lastName = { lastName }
                            makePostLike = { this.makePostLike }
                        />
                    </CSSTransition>
                )
        );

        return (
            <section className = { Styles.feed }>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleComposerAppear }>
                    <Composer createPost = { this.createPost } />
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleCounterAppear }>
                    <Counter count = { posts.length } />
                </Transition>
                <TransitionGroup>
                    { postList }
                </TransitionGroup>
                <Transition
                    appear
                    in = { postman }
                    timeout = { 1000 }
                    onEnter = { this.handlePostmanAppear }
                    onExit = { this.handlePostmanDisappear }>
                    <Postman />
                </Transition>
            </section>
        );
    }
}
