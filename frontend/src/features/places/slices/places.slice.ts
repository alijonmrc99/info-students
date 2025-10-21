import { createSlice } from '@reduxjs/toolkit';

import { IStudents } from '../models';
import { fetchAllStudents } from '../../students-list/thunks';

export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: IStudents | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),

    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllStudents.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllStudents.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload,
            error: null,
        }));

        builder.addCase(fetchAllStudents.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
