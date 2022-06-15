import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="app-layout">
                <Header />
                <Container>
                    <Outlet />
                    {children}
                </Container>
            </div>
        </>
    );
};
