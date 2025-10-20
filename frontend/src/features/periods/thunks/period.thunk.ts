import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_PERIODS } from '../endpoints';
import { IPeriod } from '../models';
import { httpApi } from '../../../App';
import { ID,  IResponse } from '../../../common/models';



export const fetchAllPeriods = createAsyncThunk('period/getAll', async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<IPeriod[]>>(ENDPOINT_PERIODS, { params }).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOnePeriod = createAsyncThunk('period/onePlace', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<IPeriod>>(`${ENDPOINT_PERIODS}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onPeriod = createAsyncThunk('period/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return httpApi.put(`${ENDPOINT_PERIODS}/${payload.id}`, payload.values);
            else
                return httpApi.post(ENDPOINT_PERIODS, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
