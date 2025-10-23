import { ID } from "../../../common/models";

export interface IStudent {
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
    files: {
        id: ID;
        name: string;
        path: string;
    }[]
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