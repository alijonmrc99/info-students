import * as yup from 'yup';
import { POST_CONTENT, POST_TITLE } from "../constants";

export const PeriodScheme = yup.object().shape({
    [POST_TITLE]: yup.string().required('error.message.required'),
    [POST_CONTENT]: yup.string().required('error.message.required')
}); 