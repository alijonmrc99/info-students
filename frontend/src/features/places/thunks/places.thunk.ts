import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_PLACES } from '../endpoints';
import { IPlaceResive } from '../models';
import { httpApi } from '../../../App';
import { ID, IPageable, IResponse } from '../../../common/models';



export const fetchAllPlaces = createAsyncThunk('places/getAll', async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<IPageable<IPlaceResive>>>(ENDPOINT_PLACES, params).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOnePlace = createAsyncThunk('places/onePlace', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<IPlaceResive>>(`${ENDPOINT_PLACES}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onPlace = createAsyncThunk('place/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return await httpApi.put(`${ENDPOINT_PLACES}/${payload.id}`, payload.values);
            else
                return await httpApi.post(ENDPOINT_PLACES, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
