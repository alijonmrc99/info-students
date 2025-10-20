import * as yup from 'yup';
import { PLACE_COORDINATEX, PLACE_COORDINATEY, PLACE_NAME } from "../constants";

export const PlaceScheme = yup.object().shape({
    [PLACE_NAME]: yup.string().required('error.message.required'),
    [PLACE_COORDINATEY]: yup.string().required('error.message.required'),
    [PLACE_COORDINATEX]: yup.string().required('error.message.required')
}); 