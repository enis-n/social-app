import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { postStore } = useStore();

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore])

  if (postStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <PostDashboard />
      </Container>
    </>
  );
}

export default observer(App);
