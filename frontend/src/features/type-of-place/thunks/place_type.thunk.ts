import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_PLACE_TYPE } from '../endpoints';
import { ITypePlace } from '../models';
import { httpApi } from '../../../App';
import { ID, IResponse } from '../../../common/models';



export const fetchAllPlaceTypes = createAsyncThunk('type_place/getAll', async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<ITypePlace[]>>(ENDPOINT_PLACE_TYPE, { params }).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOnePlaceTypes = createAsyncThunk('type_place/onePlace', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<IResponse<ITypePlace>>(`${ENDPOINT_PLACE_TYPE}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onPlaceTypes = createAsyncThunk('type_place/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return httpApi.put(`${ENDPOINT_PLACE_TYPE}/${payload.id}`, payload.values);
            else
                return httpApi.post(ENDPOINT_PLACE_TYPE, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
