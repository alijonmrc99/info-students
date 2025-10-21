// Definition: Interface for the places

import { ID } from "../../../common/models";
interface IStudent {
    id: ID;
    fullName: string;
    birthDate: string;
    email: string;
    gender: string;
    phone: string;
    imagePath: string;
    class: {
        id: ID;
        name: string;
    }
    grade: {
        id: ID;
        name: string;
    }
    files: String[]
}

export interface IStudents {
    data: IStudent[];
    meta: {
        total: number;
        currentPage: number;
        perPage: number;
        totalPages: number;
    }


}


