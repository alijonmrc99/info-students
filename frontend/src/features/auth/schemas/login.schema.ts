import * as yup from 'yup';
import { AUTH_FIELD_PASSWORD, AUTH_FIELD_USER_NAME } from "../constants";

export const LoginSchema = yup.object().shape({
    [AUTH_FIELD_USER_NAME]: yup.string().required('error.message.required'),
    [AUTH_FIELD_PASSWORD]: yup.string().required('error.message.required')
}); 