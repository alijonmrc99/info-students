// Definition: Interface for the places

import { ID } from "../../../common/models";

export interface ITeacher {
    id?: ID;
    fullName: string;
    email: string;
    phone: string,
    gradeIds: ID[];
    grades?: { id: ID, name: string }[];
}


