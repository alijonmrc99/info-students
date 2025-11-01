// Definition: Interface for the places

import { ID } from "../../../common/models";

export interface IPost {
    id?: ID;
    title: string;
    content: string;
    imageId: ID;
    gradeId: ID;
    image: {
        path: string
    }
}
