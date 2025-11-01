import { ID } from "../../../common/models";



export interface IMe {

    fullName: string;
    phone?: string;
    teacherId?: string;
    id: string;
    email?: string;
    role: IRole;
    teacher: {
        grades: {
            id: ID,
            name: string
        }[]
    }

}

export interface IMeResponse {
    user: IMe;
}

export type IRole = "ADMIN" | "TEACHER";