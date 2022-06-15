import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

export const Header = () => {
    const navigate = useNavigate();

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

    const linkTo = window.location.pathname;

    return (
        <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>CC Intern Task</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={linkTo}>
                        {navigationItems.map((item, key) => (
                            <Nav.Link
                                onClick={() => navigate(item.link)}
                                key={key}
                                className={
                                    item.link === (linkTo !== '/' ? `${linkTo}` : linkTo)
                                        ? 'active'
                                        : ''
                                }
                            >
                                {item.name}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
