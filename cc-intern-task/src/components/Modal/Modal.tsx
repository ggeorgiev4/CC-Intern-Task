import { Button, Modal } from 'react-bootstrap';
import { ModalProps } from '../../models/modal-props';

export const ModalWrapper = ({ title, body, actions, show, modalProperties }: ModalProps) => {
    return (
        <Modal show={show} backdrop="static">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{body}</Modal.Body>

            <Modal.Footer>
                {actions.map((item, key) => (
                    <Button
                        key={key}
                        variant={item.type}
                        onClick={() => {
                            item.onClick(modalProperties);
                        }}
                        type={item.submit ? 'submit' : 'button'}
                    >
                        {item.text}
                    </Button>
                ))}
            </Modal.Footer>
        </Modal>
    );
};
