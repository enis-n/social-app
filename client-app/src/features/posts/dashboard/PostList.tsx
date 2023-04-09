import React from 'react'
import { Post } from '../../../app/models/post'
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
    posts: Post[];
    selectPost: (id: string) => void;
    deletePost: (id: string) => void;
}

export default function PostList({ posts, selectPost, deletePost }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {posts.map(post => (
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
                            <Item.Meta>{post.date}</Item.Meta>
                            <Item.Description>
                                <div>{post.description}</div>
                                <div>{post.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectPost(post.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deletePost(post.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={post.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}