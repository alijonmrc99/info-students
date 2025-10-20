// Definition: Interface for the places

import { ID } from "../../../common/models";

export interface IPlaceResive {
    id?: ID;
    name: string;
    images: { id: ID, path: string }[];
    secondaryName?: string;
    coordinateY: string;
    coordinateX: string;
    secondName: string;
    province: {
        id: ID;
        name: string;
    }
    district: {
        id: ID;
        name: string;
    }
    height: string;
    area: string;
    century: string;
    source: string;
    stateOfPreservation: {
        id: ID,
        name: string,
        nameUz: string,
        nameEn: string,
    }
    typeOfPlace: {
        id: ID,
        name: string,
        nameUz: string,
        nameEn: string,
    }
    expeditionType: {
        id: ID,
        name: string,
    }
    periods: {
        id: ID,
        name: string,
        nameUz: string,
        nameEn: string,
    }[];
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

export interface IPlaceSend {
    province: ID;
    id?: ID;
    _method?: string;
    name: string;
    images: { id: ID, path: string }[];
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

