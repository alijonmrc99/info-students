import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_STUDENTS } from '../endpoints';
import { IPlaceResive } from '../models';
import { httpApi } from '../../../App';
import { ID, IResponse } from '../../../common/models';
import { IStudents } from '../../places/models';



export const fetchAllStudents = createAsyncThunk(`students/all`, async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<IStudents>(ENDPOINT_STUDENTS, params).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOneStundent = createAsyncThunk('students/onePlace', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<IPlaceResive>>(`${ENDPOINT_STUDENTS}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onStundent = createAsyncThunk('students/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return await httpApi.put(`${ENDPOINT_STUDENTS}/${payload.id}`, payload.values);
            else
                return await httpApi.post(ENDPOINT_STUDENTS, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
