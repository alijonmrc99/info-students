import { FC, useState } from "react";
import { MenuDataContext } from "../contexts";

export const MenuProvider: FC<any> = ({ children }) => {
    const [menu, setMenu] = useState<boolean>(false);

    return <MenuDataContext.Provider value={{ menu, setMenu }}>
        {children}
    </MenuDataContext.Provider>

}