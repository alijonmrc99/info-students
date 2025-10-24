import * as yup from 'yup';
import { FULLNAME } from "../constants";

export const PlaceScheme = yup.object().shape({
    [FULLNAME]: yup.string().required('error.message.required'),
}); 