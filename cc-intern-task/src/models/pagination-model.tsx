export interface PaginationProps {
    data: Array<any>;
    pageSize: number;
    page: number;
    onPaginationChange: (e: any) => void;
}
