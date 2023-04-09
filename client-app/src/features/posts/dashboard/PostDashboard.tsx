import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import PostList from './PostList';
import PostDetails from '../details/PostDetails';
import PostForm from '../form/PostForm';

interface Props {
    posts: Post[];
    selectedPost: Post | undefined;
    selectPost: (id: string) => void;
    cancelSelectPost: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (post: Post) => void;
    deletePost: (id: string) => void;
}

export default function PostDashboard({ posts, selectedPost,
    selectPost, cancelSelectPost, editMode, openForm, closeForm, createOrEdit, deletePost }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList
                    posts={posts}
                    selectPost={selectPost}
                    deletePost={deletePost}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost && !editMode &&
                    <PostDetails
                        post={selectedPost}
                        cancelSelectPost={cancelSelectPost}
                        openForm={openForm}
                    />}
                {editMode &&
                    <PostForm closeForm={closeForm} post={selectedPost} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}