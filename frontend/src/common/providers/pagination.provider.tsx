import { FC, useState } from "react";
import { IPagination, PaginationDataContext } from "../contexts";

export const PaginationProvider: FC<any> = ({ children }) => {
    const [pagination, setPagination] = useState<IPagination>({ page: 1, perPage: 30 })


    return <PaginationDataContext.Provider value={{ pagination, setPagination }}>
        {children}
    </PaginationDataContext.Provider>

}