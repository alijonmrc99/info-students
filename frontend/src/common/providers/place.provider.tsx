import { FC, useState } from "react";
import { IPlaceProps, PlaceModalContext } from "../contexts";

export const PlaceModalProvider: FC<any> = ({ children }) => {
    const [placeModal, setPlaceModal] = useState<IPlaceProps>({ open: false, id: '' });
    return (
        <PlaceModalContext.Provider value={{ placeModal, setPlaceModal }}>
            {children}
        </PlaceModalContext.Provider>
    )

}