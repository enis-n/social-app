import React from 'react'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Post } from '../../../app/models/post'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PostListItemAttendee from './PostListItemAttendee';

interface Props {
    post: Post;
}

export default function PostListItem({ post }: Props) {
    return (
        <Segment.Group>
            <Segment>
                {post.isCancelled &&
                    <Label attached='top' color='red' content='Cancelled' style={{ textAlign: 'center' }} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{ marginBottom: 4 }} size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/posts/${post.id}`}>
                                {post.title}
                            </Item.Header>
                            <Item.Description>Hosted by {post.host?.displayName}</Item.Description>
                            {post.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>You are the host of this event</Label>
                                </Item.Description>
                            )}
                            {post.isGoing && !post.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>You are going to this event</Label>
                                </Item.Description>
                            )}
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
                <PostListItemAttendee
                    attendees={post.attendees!}
                />
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
