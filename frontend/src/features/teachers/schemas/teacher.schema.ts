import * as yup from 'yup';
import { TEACHER_FULLNAME, TEACHER_EMAIL } from "../constants";

export const UserScheme = yup.object().shape({
    [TEACHER_FULLNAME]: yup.string().required('error.message.required'),
    [TEACHER_EMAIL]: yup.string().required('error.message.required'),

}); 