import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export default observer(function PostList() {
    const { postStore } = useStore();
    const { deletePost, postsByDate, loading } = postStore;

    const [target, setTarget] = useState('');

    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePost(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {postsByDate.map(post => (
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
                            <Item.Meta>{post.date}</Item.Meta>
                            <Item.Description>
                                <div>{post.description}</div>
                                <div>{post.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`posts/${post.id}`} floated='right' content='View' color='blue' />
                                <Button
                                    name={post.id}
                                    loading={loading && target === post.id}
                                    onClick={(e) => handlePostDelete(e, post.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                                <Label basic content={post.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})