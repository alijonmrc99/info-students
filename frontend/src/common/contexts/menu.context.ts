import { createContext } from "react";

export interface IMenuData { menu: boolean, setMenu: (value: boolean) => void };
export const MenuDataContext = createContext<IMenuData | null>(null)

