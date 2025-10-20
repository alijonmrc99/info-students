import { createSlice } from '@reduxjs/toolkit';

import { IPlaceResive } from '../models';
import { fetchAllPlaces } from '../thunks';
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

export const placesSlice = createSlice({
    name: 'places',
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

        builder.addCase(fetchAllPlaces.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllPlaces.fulfilled, (state, { payload: { result } }) => ({
            ...state,
            isLoading: false,
            result: result,
            error: null,
        }));

        builder.addCase(fetchAllPlaces.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
