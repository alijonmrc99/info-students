import { createContext } from "react";

export interface IPagination { perPage: number, page: number }
export interface IPaginationData { pagination: IPagination, setPagination: (value: IPagination) => void };

export const PaginationDataContext = createContext<IPaginationData | null>(null)