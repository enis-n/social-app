import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    UBT Social App
                </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Posts' />
                <Menu.Item>
                    <Button as={NavLink} to='/createPost' positive content='Create Post' />
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createJob' positive content='Create Job Post' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
