


export interface IMe {

    fullName: string;
    phone?: string;
    teacherId?: string;
    id: string;
    email?: string;
    role: IRole;

}

export interface IMeResponse {
    user: IMe;
}

export type IRole = "ADMIN" | "TEACHER";