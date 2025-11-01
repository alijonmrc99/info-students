// Definition: Interface for the places

import { ID } from "../../../common/models";

export interface IUser {
    id?: ID;
    fullName: string;
    username: string;
    password: string;
    email: string;
    role: string;
}

export interface IUsers {
    data: IUser[];
}

