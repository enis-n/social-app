import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite'

export default observer(function HomePage() {
    const { userStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' styles={{ marginBottom: 12 }} />
                    UBT Social Media App
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to our app' />
                        <Button as={Link} to='/posts' size='huge' inverted>
                            Go to posts
                        </Button>
                    </>
                ) : (
                    <Button as={Link} to='/login' size='huge' inverted>
                        Login
                    </Button>
                )}
            </Container>
        </Segment>
    )
})
