import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import PostDetailedHeader from './PostDetailedHeader';
import PostDetailedInfo from './PostDetailedInfo';
import PostDetailedChat from './PostDetailedChat';
import PostDetailedSidebar from './PostDetailedSidebar';

export default observer(function PostDetails() {
    const { postStore } = useStore();
    const { selectedPost: post, loadPost, loadingInitial, clearSelectedPost } = postStore;
    const { id } = useParams<{ id: string }>();

    /* useEffect(() => {
        if (id) loadPost(id);
        return () => clearSelectedPost();
    }, [id, loadPost, clearSelectedPost]);
 */
    useEffect(() => {
        if (id) {
            loadPost(id);
        }
        return () => {
            clearSelectedPost();
        };
    }, [id, loadPost, clearSelectedPost]);


    if (loadingInitial || !post) return <LoadingComponent content={''} />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <PostDetailedHeader post={post} />
                <PostDetailedInfo post={post} />
                <PostDetailedChat postId={post.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <PostDetailedSidebar
                    post={post}
                />
            </Grid.Column>
        </Grid>
    )
})
