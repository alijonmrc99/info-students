import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_PRESERVATION } from '../endpoints';
import { IPreservation } from '../models';
import { httpApi } from '../../../App';
import { ID, IResponse } from '../../../common/models';



export const fetchAllPreservation = createAsyncThunk('preservation/getAll', async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<IPreservation[]>>(ENDPOINT_PRESERVATION, { params }).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOnePreservation = createAsyncThunk('preservation/onePlace', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<IPreservation>>(`${ENDPOINT_PRESERVATION}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onPreservation = createAsyncThunk('preservation/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return httpApi.put(`${ENDPOINT_PRESERVATION}/${payload.id}`, payload.values);
            else
                return httpApi.post(ENDPOINT_PRESERVATION, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
