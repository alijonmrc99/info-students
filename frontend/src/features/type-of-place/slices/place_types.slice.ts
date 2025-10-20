import { createSlice } from '@reduxjs/toolkit';

import { ITypePlace } from '../models';
import { fetchAllPlaceTypes } from '../thunks';


export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: ITypePlace[] | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const placeTypesSlice = createSlice({
    name: 'placeTypes',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllPlaceTypes.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllPlaceTypes.fulfilled, (state, { payload: { result } }) => ({
            ...state,
            isLoading: false,
            result: result,
            error: null,
        }));

        builder.addCase(fetchAllPlaceTypes.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
