import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'

export default function NavBar() {
    const { postStore } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    UBT Social App
                </Menu.Item>
                <Menu.Item name='Posts' />
                <Menu.Item>
                    <Button onClick={() => postStore.openForm()} positive content='Create Post' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
