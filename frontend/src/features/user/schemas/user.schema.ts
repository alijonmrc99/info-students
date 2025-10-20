import * as yup from 'yup';
import { USER_NAME, USER_FULLNAME, USER_PASSWORD, USER_EMAIL, USER_ROLE } from "../constants";

export const UserScheme = yup.object().shape({
    [USER_FULLNAME]: yup.string().required('error.message.required'),
    [USER_NAME]: yup.string().required('error.message.required'),
    [USER_PASSWORD]: yup.string().required('error.message.required'),
    [USER_EMAIL]: yup.string().required('error.message.required'),
    [USER_ROLE]: yup.string().required('error.message.required')

}); 