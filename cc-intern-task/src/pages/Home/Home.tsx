import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AppContext } from '../../App';
import { ModalProps, ModalWrapper } from '../../components/Modal/Modal';
import { Posts } from '../Posts/Posts';
import { Users } from '../Users/Users';

export const Home = () => {
    const [modalProps, setModalProps] = useState<ModalProps>({
        title: '',
        body: <></>,
        actions: [],
        show: false,
        modalProperties: {},
    });

    return (
        <div className="home-wrapper">
            <Row className="justify-content-center">
                <Col>
                    <Users />
                </Col>

                <Col>
                    <Posts />
                </Col>
            </Row>

            <ModalWrapper
                title={modalProps.title}
                body={modalProps.body}
                actions={modalProps.actions}
                show={modalProps.show}
                modalProperties={modalProps.modalProperties}
            />
        </div>
    );
};
