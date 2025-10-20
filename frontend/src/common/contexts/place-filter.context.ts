import { createContext } from "react";

export interface IPlaceFilter {
    name?: string;
    secondName?: string;
    province?: string;
    provinceId?: string;
    district?: string;
    districtId?: string;
    periodIds?: string | number[];
    typeOfPlaceId?: string;
    stateOfPreservationId?: string | number[];
    stateOfPreservationIds?: string | number[];
};

export interface IPlaceFilterData { filter: IPlaceFilter, setFilter: (value: IPlaceFilter) => void }

export const PlaceFilterContext = createContext<IPlaceFilterData | null>(null)