import { Col, Row } from 'react-bootstrap';
import { Posts } from '../Posts/Posts';
import { Users } from '../Users/Users';

export const Home = () => {
    return (
        <div className="home-wrapper">
            <Row className="justify-content-center">
                <Col>
                    <Users pagination={true} />
                </Col>

                <Col>
                    <Posts />
                </Col>
            </Row>
        </div>
    );
};
