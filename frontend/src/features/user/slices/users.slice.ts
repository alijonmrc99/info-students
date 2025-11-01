import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../models';
import { fetchAllUser } from '../thunks';


export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: IUser[] | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllUser.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllUser.fulfilled, (state, { payload: { data } }) => ({
            ...state,
            isLoading: false,
            result: data,
            error: null,
        }));

        builder.addCase(fetchAllUser.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
