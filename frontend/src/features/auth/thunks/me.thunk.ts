import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_AUTH_ME } from '../endpoints';
import { IMeResponse } from '../models';
import { httpApi } from '../../../App';


export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
    try {
        return await httpApi.get<IMeResponse>(ENDPOINT_AUTH_ME, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});
