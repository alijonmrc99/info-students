import * as yup from 'yup';
import { PLACE_NAME_EN, PLACE_NAME_UZ } from "../constants";

export const PlaceTypeScheme = yup.object().shape({
    [PLACE_NAME_UZ]: yup.string().required('error.message.required'),
    [PLACE_NAME_EN]: yup.string().required('error.message.required')
}); 