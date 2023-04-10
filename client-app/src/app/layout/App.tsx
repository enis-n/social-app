import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Posts.list().then(response => {
      let posts: Post[] = [];
      response.forEach(post => {
        post.date = post.date.split('T')[0];
        posts.push(post);
      })
      setPosts(posts);
      setLoading(false)
    })
  }, [])

  function handleSelectPost(id: string) {
    setSelectedPost(posts.find(x => x.id === id));
  }

  function handleCancelSelectPost() {
    setSelectedPost(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectPost(id) : handleCancelSelectPost();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditPost(post: Post) {
    setSubmitting(true);
    if (post.id) {
      agent.Posts.update(post).then(() => {
        setPosts([...posts.filter(x => x.id !== post.id), post])
        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      post.id = uuid();
      agent.Posts.create(post).then(() => {
        setPosts([...posts, post]);
        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeletePost(id: string) {
    setSubmitting(true);
    agent.Posts.delete(id).then(() => {
      setPosts([...posts.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading App' />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <PostDashboard
          posts={posts}
          selectedPost={selectedPost}
          selectPost={handleSelectPost}
          cancelSelectPost={handleCancelSelectPost}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditPost}
          deletePost={handleDeletePost}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
