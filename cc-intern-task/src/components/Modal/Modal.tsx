import { ReactNode, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export interface ModalProps {
    title: string;
    body: ReactNode;
    actions: Array<{
        text: string;
        onClick: (e?: any) => void;
        type: string;
        submit?: () => void;
    }>;
    show: boolean;
    modalProperties: Object;
}

export const ModalWrapper = ({ title, body, actions, show, modalProperties }: ModalProps) => {
    const [content, setContent] = useState(modalProperties);

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
