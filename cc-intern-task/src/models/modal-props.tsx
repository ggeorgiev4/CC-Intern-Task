import { ReactNode } from 'react';

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
