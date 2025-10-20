import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../models';
import { fetchAllUser } from '../thunks';
import { IPageable } from '../../../common/models';


export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: IPageable<IUser[]> | null;
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

        builder.addCase(fetchAllUser.fulfilled, (state, { payload: { result } }) => ({
            ...state,
            isLoading: false,
            result: result,
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
