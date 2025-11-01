import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_USER } from '../endpoints';
import { IUser, IUsers } from '../models';
import { httpApi } from '../../../App';
import { ID } from '../../../common/models';



export const fetchAllUser = createAsyncThunk('user/getAll', async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<IUsers>(ENDPOINT_USER, { params }).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOneUser = createAsyncThunk('user/oneUser', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<IUser>(`${ENDPOINT_USER}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onUser = createAsyncThunk('user/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return await httpApi.put(`${ENDPOINT_USER}/${payload.id}`, payload.values);
            else
                return await httpApi.post(ENDPOINT_USER, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
