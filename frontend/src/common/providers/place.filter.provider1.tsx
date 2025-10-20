import { FC, useState } from "react";
import {  IPlaceFilter, PlaceFilterContext } from "../contexts";


export const PlaceFilterProvider: FC<any> = ({ children }) => {
    const [filter, setFilter] = useState<IPlaceFilter>({})

    return <PlaceFilterContext.Provider value={{  filter, setFilter }}>
        {children}
    </PlaceFilterContext.Provider>

}