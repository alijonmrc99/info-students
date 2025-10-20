export interface IPageable<T> {
    data: T[]
    meta: {
        pageSize: number;
        totalElements: number;
        total: number;
        page: number;
    }
}