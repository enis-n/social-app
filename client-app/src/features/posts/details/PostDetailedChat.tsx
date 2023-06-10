import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Segment, Header, Comment, Button } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import MyTextArea from '../../../app/common/form/MyTextArea'

interface Props {
    postId: string
}

export default observer(function ActivityDetailedChat({ postId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (postId) {
            commentStore.createHubConnection(postId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, postId])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.createdAt.toString()}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Formik
                        onSubmit={(values, { resetForm }) =>
                            commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{ body: '' }}
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form className='ui form'>
                                <MyTextArea placeholder='Add Comment' name='body' rows={2} />
                                <Button
                                    loading={isSubmitting}
                                    disabled={isSubmitting || !isValid}
                                    content='Add Reply'
                                    labelPosition='left'
                                    icon='edit'
                                    primary
                                    type='submit'
                                    floated='right'
                                />
                            </Form>
                        )}
                    </Formik>
                </Comment.Group>
            </Segment>
        </>

    )
})