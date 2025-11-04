// Definition: Interface for the places

import { ID } from "../../../common/models";

export interface IPost {
    id?: ID;
    title: string;
    content: string;
    imageId: ID;
    gradeId: number;
    image: {
        path: string
    }
}

export interface IPosts {
    data: IPost[],
    meta: {
        total: number,
        currentPage: number
        perPage: number,
        totalPages: number
    }
}
