


export interface IMe {
    fullName: string;
    phone?: string;
    teacherId?: string;
    id: string;
    email?: string;
    role: IRole;
}

export type IRole = "ADMIN" | "TEACHER";