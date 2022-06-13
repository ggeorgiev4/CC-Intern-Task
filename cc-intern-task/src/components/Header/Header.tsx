import { ReactNode } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export const Header = () => {
    const navigationItems = [
        {
            link: '/users',
            name: 'Users',
        },
        {
            link: '/posts',
            name: 'Posts',
        },
    ];

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">CC Intern Task</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {navigationItems.map((item, key) => (
                            <Nav.Link href={item.link} key={key}>
                                {item.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
