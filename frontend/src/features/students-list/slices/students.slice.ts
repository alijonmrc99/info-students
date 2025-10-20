import { createSlice } from '@reduxjs/toolkit';

import { IPlaceResive } from '../models';
import { fetchAllStudents } from '../thunks';
import { IPageable } from '../../../common/models';
import result from 'antd/es/result';

export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: IPageable<IPlaceResive> | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
        toggleIsPrivate: (state, { payload: { id } }) => {
            if (state.result) {
                state.result.data = state.result.data.map((place) =>
                    place.id === id ? { ...place, isPrivate: !place.isPrivate } : place
                );
            }
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllStudents.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllStudents.fulfilled, (state, { payload: { result } }) => ({
            ...state,
            isLoading: false,
            result: result,
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
