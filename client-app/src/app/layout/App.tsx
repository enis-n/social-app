import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PostForm from '../../features/posts/form/PostForm';
import PostDetails from '../../features/posts/details/PostDetails';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/posts' component={PostDashboard} />
              <Route path='/posts/:id' component={PostDetails} />
              <Route key={location.key} path={['/createPost', '/manage/:id']} component={PostForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
