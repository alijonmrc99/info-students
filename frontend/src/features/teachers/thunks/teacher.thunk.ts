import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_TEACHER } from '../endpoints';
import { ITeacher } from '../models';
import { httpApi } from '../../../App';
import { ID } from '../../../common/models';



export const fetchAllTeachers = createAsyncThunk('teacher/getAll', async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<ITeacher[]>(ENDPOINT_TEACHER, { params }).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOneTeacher = createAsyncThunk('teacher/oneUser', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<ITeacher>(`${ENDPOINT_TEACHER}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onTeacher = createAsyncThunk('teacher/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return await httpApi.put(`${ENDPOINT_TEACHER}/${payload.id}`, payload.values);
            else
                return await httpApi.post(ENDPOINT_TEACHER, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
