import { createSlice } from '@reduxjs/toolkit';

import { ITeacher } from '../models';
import { fetchAllTeachers } from '../thunks';


export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: ITeacher[] | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllTeachers.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllTeachers.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload,
            error: null,
        }));

        builder.addCase(fetchAllTeachers.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
