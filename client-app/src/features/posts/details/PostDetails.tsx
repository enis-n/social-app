import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function PostDetails() {
    const { postStore } = useStore();
    const { selectedPost: post, openForm, cancelSelectedPost } = postStore;

    if (!post) return <LoadingComponent content={''} />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${post.category}.jpg`} />
            <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>
                    <span>{post.date}</span>
                </Card.Meta>
                <Card.Description>
                    {post.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(post.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedPost} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
