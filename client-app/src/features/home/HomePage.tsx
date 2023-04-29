import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' styles={{ marginBottom: 12 }} />
                    UBT Social Media App
                </Header>
                <Header as='h2' inverted content='Welcome to our app' />
                <Button as={Link} to='/posts' size='huge' inverted>
                    Take to the app
                </Button>
            </Container>
        </Segment>
    )
}
