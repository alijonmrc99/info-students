import { ID } from "./base-types"

export interface IResponse<T> {
    error: string,
    success: boolean
    result: T
}

export interface IProvinceAndDistrict {
    id: ID
    name: string,
    districts: []
}

export interface IPlaceInner {
    id: ID,
    nameUz: string,
    nameEn?: string,
}