import { Dispatch, SetStateAction, useState } from 'react';
import { BackendService } from '../../helpers/Backend-Service';
import { User } from '../../models/user-model';

interface IGetUser {
    usersFiltered: User[];
    query: string;
    currentPage: number;
    totalItems: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setQuery: Dispatch<SetStateAction<string>>;
}

export const useQuery = (pageSize: number, users: User[]): IGetUser => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersFiltered = users.filter(
        ({ name }) => name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
    );
    return {
        usersFiltered: usersFiltered.slice(
            (currentPage ? currentPage - 1 : 1) * pageSize,
            (currentPage ? currentPage - 1 : 1) * pageSize + pageSize
        ),
        setCurrentPage,
        totalItems: usersFiltered.length,
        query,
        currentPage,
        setQuery,
    };
};
