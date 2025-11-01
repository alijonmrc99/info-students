// Definition: Interface for the places

import { ID } from "../../../common/models";

export interface IPeriod {
    id?: ID;
    title: string;
    content: string;
    imageId: ID;
    gradeId: ID;
}

export interface IPlaceSend {
    province: ID;
    id?: ID;
    _method?: string;
    name: string;
    secondaryName?: string;
    coordinateY: string;
    coordinateX: string;
    provinceId: ID;
    districtId: ID;
    height: string;
    area: string;
    century: string;
    source: string;
    stateOfPreservationId: ID;
    typeOfPlaceId: ID;
    expeditionTypeId: ID;
    period: string[];
    informer: string;
    securityInformation: {
        hasCadastralDoc: boolean,
        isSurronded: boolean,
        hasInformationBoard: boolean,
    }
    learningOfHistory: {
        isPlanographic: boolean,
        isShurf: boolean,
        hasPrimaryStudy: boolean,
    }
    description: string;
    isPrivate: boolean;
}

