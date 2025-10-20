import { createSlice } from '@reduxjs/toolkit';

import { IMe } from '../models';
import { fetchMe } from '../thunks';

export interface InitialStatePropsMe {
    isLoading: boolean;
    result: IMe | null;
    error: any;
}

const initialState: InitialStatePropsMe = {
    isLoading: false,
    result: null,
    error: null,
};

export const meSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
        updateUserRestaurant: (state, { payload }) => ({ ...state, result: payload })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchMe.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchMe.fulfilled, (state, { payload: { result } }) => ({
            ...state,
            isLoading: false,
            result: result,
            error: null,
        }));

        builder.addCase(fetchMe.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
