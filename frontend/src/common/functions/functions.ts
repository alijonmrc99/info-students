import { httpApi } from "../../App";

export function gpsToDecimal(gpsCoord: string): string {
    // Use a regular expression to parse the coordinate
    const regex = /([NSWE])(\d+)°(\d+)'([\d.]+)"/;
    const match = gpsCoord.match(regex);

    if (!match) {
        throw new Error("Invalid GPS coordinate format.");
    }

    // Extract components
    const hemisphere = match[1]; // N, S, E, W
    const degrees = parseFloat(match[2]);
    const minutes = parseFloat(match[3]);
    const seconds = parseFloat(match[4]);

    // Convert to decimal degrees
    let decimal = degrees + minutes / 60 + seconds / 3600;

    // Adjust for hemisphere (negative for South and West)
    if (hemisphere === "S" || hemisphere === "W") {
        decimal *= -1;
    }

    return decimal.toString();
}

export function decimalToDMS(coord: string, isLatitude: boolean): string {
    let decimalCoord = parseFloat(coord)
    const degrees = Math.floor(decimalCoord);
    const minutesFloat = Math.abs(decimalCoord - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = (minutesFloat - minutes) * 60;

    const direction = isLatitude
        ? decimalCoord >= 0 ? 'N' : 'S'
        : decimalCoord >= 0 ? 'E' : 'W';

    return ` ${direction}${Math.abs(degrees)}°${minutes}'${seconds.toFixed(2)}"`;
}

export interface IFile {
    success: boolean
    data: {
        path: string;
    }
}

export const uploadFile = async (files: any, path: string, name: string) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append(`${name}[]`, files[i]); // Array sifatida yuboramiz
    }


    try {
        const result: IFile = await httpApi.post(`${path}`, formData, {
            headers: {
                acsept: "application/json",
                'content-type': "multipart/form-data"
            }
        });
        if (result.success) {
            return result
        }

    } catch (error: any) {
        throw error
    }
}


