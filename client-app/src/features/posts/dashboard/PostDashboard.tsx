import React from 'react';
import { Grid } from 'semantic-ui-react';
import PostList from './PostList';
import PostDetails from '../details/PostDetails';
import PostForm from '../form/PostForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function PostDashboard() {
    const { postStore } = useStore();
    const { selectedPost, editMode } = postStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost && !editMode &&
                    <PostDetails />}
                {editMode &&
                    <PostForm />}
            </Grid.Column>
        </Grid>
    )
})