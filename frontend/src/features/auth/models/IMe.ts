import { RoleTypeEnums } from "../../../common/constants/base.constants";


export interface IMe {
    fullName: string;
    username: string;
    email?: string;
    roles: IRole[];
}

export interface IRole { id: number, name: RoleTypeEnums, title: string }