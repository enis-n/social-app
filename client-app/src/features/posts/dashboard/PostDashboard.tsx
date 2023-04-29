import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import PostList from './PostList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PostFilters from './PostFilters';

export default observer(function PostDashboard() {
    const { postStore } = useStore();
    const { loadPosts, postRegistry } = postStore;

    useEffect(() => {
        if (postRegistry.size <= 1) loadPosts();
    }, [postRegistry.size, loadPosts])

    if (postStore.loadingInitial) return <LoadingComponent content='Loading App' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList />
            </Grid.Column>
            <Grid.Column width='6'>
                <PostFilters />
            </Grid.Column>
        </Grid>
    )
})