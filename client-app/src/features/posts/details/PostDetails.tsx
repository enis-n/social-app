import React, { useEffect } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export default observer(function PostDetails() {
    const { postStore } = useStore();
    const { selectedPost: post, loadPost, loadingInitial } = postStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadPost(id);
    }, [id, loadPost]);

    if (loadingInitial || !post) return <LoadingComponent content={''} />;

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
                    <Button as={Link} to={`/manage/${post.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/posts' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})
