import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import { Post } from '../../../app/models/post';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';


const postImageStyle = {
    filter: 'brightness(30%)'
};

const postImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    post: Post
}

export default observer(function ActivityDetailedHeader({ post }: Props) {
    const { postStore: { updateAttendance, loading, cancelPostToggle } } = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {post.isCancelled &&
                    <Label
                        style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon
                        color='red'
                        content='Cancelled'
                    />
                }
                <Image src={`/assets/categoryImages/${post.category}.jpg`} fluid style={postImageStyle} />
                <Segment style={postImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={post.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(post.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>
                                        <Link to={`/profiles/${post.host?.username}`} >{post.host?.displayName}</Link>
                                    </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {post.isHost ? (
                    <>
                        <Button
                            color={post.isCancelled ? 'green' : 'red'}
                            floated='left'
                            basic
                            content={post.isCancelled ? 'Re-activate Post' : 'Cancel Post'}
                            onClick={cancelPostToggle}
                            loading={loading}
                        />
                        <Button
                            disabled={post.isCancelled}
                            as={Link}
                            to={`/manage/${post.id}`}
                            color='orange'
                            floated='right'>
                            Manage Event
                        </Button>
                    </>
                ) : post.isGoing ? (
                    <Button loading={loading} onClick={updateAttendance} >Cancel attendance</Button>
                ) : (
                    <Button
                        disabled={post.isCancelled}
                        loading={loading}
                        onClick={updateAttendance}
                        color='teal'>Join Event</Button>
                )}
            </Segment>
        </Segment.Group>
    )
})
