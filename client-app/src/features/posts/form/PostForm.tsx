import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from "uuid";

export default observer(function PostForm() {
    const history = useHistory();
    const { postStore } = useStore();
    const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
    const { id } = useParams<{ id: string }>();

    const [post, setPost] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadPost(id).then(post => setPost(post!));
    }, [id, loadPost]);

    function handleSubmit() {
        if (post.id.length === 0) {
            let newPost = {
                ...post,
                id: uuid()
            };
            createPost(newPost).then(() => history.push(`/posts/${newPost.id}`));
        } else {
            updatePost(post).then(() => history.push(`/posts/${post.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value })
    }

    if (loadingInitial) return <LoadingComponent content='Loading post...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={post.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={post.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={post.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={post.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={post.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/posts' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
