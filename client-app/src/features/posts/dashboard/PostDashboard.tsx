import React, { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import PostList from './PostList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PostFilters from './PostFilters';
import { PagingParams } from '../../../app/models/pagination';

export default observer(function PostDashboard() {
    const { postStore } = useStore();
    const { loadPosts, postRegistry, setPagingParams, pagination } = postStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadPosts().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (postRegistry.size <= 1) loadPosts();
    }, [postRegistry.size, loadPosts])

    if (postStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading Posts' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList />
                <Button
                    floated='right'
                    content='More...'
                    positive
                    onClick={handleGetNext}
                    loading={loadingNext}
                    disabled={pagination?.totalPages === pagination?.currentPage}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                <PostFilters />
            </Grid.Column>
        </Grid>
    )
})