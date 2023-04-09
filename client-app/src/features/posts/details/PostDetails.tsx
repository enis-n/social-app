import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Post } from '../../../app/models/post'

interface Props {
    post: Post;
    cancelSelectPost: () => void;
    openForm: (id: string) => void;
}

export default function PostDetails({ post, cancelSelectPost, openForm }: Props) {
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
                    <Button onClick={cancelSelectPost} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}
