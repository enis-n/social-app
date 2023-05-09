import React from 'react'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { Post } from '../../../app/models/post'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
    post: Post;
}

export default function PostListItem({ post }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/posts/${post.id}`}>
                                {post.title}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(post.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {post.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{post.description}</span>
                <Button
                    as={Link}
                    to={`/posts/${post.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}
