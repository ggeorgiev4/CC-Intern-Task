export interface PaginationProps {
    totalItems: number;
    pageSize: number;
    page: number;
    onPaginationChange: (e: any) => void;
}
