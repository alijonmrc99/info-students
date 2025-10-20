import { createContext } from "react";
import { ID } from "../models";

export interface IPlaceModalData { placeModal: IPlaceProps, setPlaceModal: (value: IPlaceProps) => void };

export interface IPlaceProps { open: boolean, id: ID };

export const PlaceModalContext = createContext<IPlaceModalData | null>(null)