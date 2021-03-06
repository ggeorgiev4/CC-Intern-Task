import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { PaginationProps } from '../../models/pagination-model';
import './styles.scss';

export const PaginationWrapper = ({
    totalItems,
    pageSize,
    onPaginationChange,
    page,
}: PaginationProps) => {
    const [items, setItems] = useState<Array<any>>([]);
    const [currentPage, setCurrentPage] = useState<number>(page);

    useEffect(() => {
        initItems();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, totalItems]);

    const initItems = () => {
        let tempItems = [];
        const numberOfPages = Math.ceil(totalItems / pageSize);
        for (let number = 1; number <= numberOfPages; number++) {
            tempItems.push(
                <Pagination.Item
                    onClick={handlePaginationClick}
                    key={number}
                    active={number === currentPage ? true : false}
                >
                    {number}
                </Pagination.Item>
            );
        }

        setItems(tempItems);
    };

    const handlePaginationClick = (event: any) => {
        const active = event.target.parentElement.classList.contains('active');
        const eventPage = Number(event.target.text);
        if (eventPage !== currentPage && !active) {
            setCurrentPage(eventPage);
            onPaginationChange(eventPage);
        }
    };

    return (
        <div className="pagination-wrapper">
            <Pagination>{items}</Pagination>
        </div>
    );
};
