import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from "uuid";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Post, PostFormValues } from '../../../app/models/post';

export default observer(function PostForm() {
    const history = useHistory();
    const { postStore } = useStore();
    const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
    const { id } = useParams<{ id: string }>();

    const [post, setPost] = useState<PostFormValues>(new PostFormValues);

    const validationSchema = Yup.object({
        title: Yup.string().required('The post title is required'),
        description: Yup.string().required('The post description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required'),
        venue: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadPost(id).then(post => setPost(new PostFormValues(post)));
    }, [id, loadPost]);

    function handleFormSubmit(post: PostFormValues) {
        if (!post.id) {
            let newPost = {
                ...post,
                id: uuid()
            };
            createPost(newPost).then(() => history.push(`/posts/${newPost.id}`));
        } else {
            updatePost(post).then(() => history.push(`/posts/${post.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading post...' />

    return (
        <Segment clearing>
            <Header content='Post Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={post}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit'
                        />
                        <Button as={Link} to='/posts' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
