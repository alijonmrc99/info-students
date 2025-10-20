import { createSlice } from '@reduxjs/toolkit';

import { IPreservation } from '../models';
import { fetchAllPreservation } from '../thunks';


export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: IPreservation[] | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const perservationsSlice = createSlice({
    name: 'perservations',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllPreservation.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllPreservation.fulfilled, (state, { payload: { result } }) => ({
            ...state,
            isLoading: false,
            result: result,
            error: null,
        }));

        builder.addCase(fetchAllPreservation.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
