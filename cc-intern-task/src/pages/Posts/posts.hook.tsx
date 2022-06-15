import { Dispatch, SetStateAction, useState } from 'react';
import { Post } from '../../models/post-model';

interface IGetPost {
    postsFiltered: Post[];
    query: string;
    currentPage: number;
    totalItems: number;
    sort: string;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setQuery: Dispatch<SetStateAction<string>>;
    setSort: Dispatch<SetStateAction<string>>;
}

export const useQuery = (pageSize: number, posts: Post[]): IGetPost => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState<string>('');
    const postsFiltered = posts.filter(
        ({ title }) => title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
    );
    return {
        postsFiltered: postsFiltered
            .sort((a, b): number => {
                if (!sort.length) return 0;
                if (sort === 'asc') {
                    return a.title.localeCompare(b.title);
                }

                return b.title.localeCompare(a.title);
            })
            .slice(
                (currentPage ? currentPage - 1 : 1) * pageSize,
                (currentPage ? currentPage - 1 : 1) * pageSize + pageSize
            ),
        setCurrentPage,
        totalItems: postsFiltered.length,
        query,
        currentPage,
        setQuery,
        setSort,
        sort,
    };
};
