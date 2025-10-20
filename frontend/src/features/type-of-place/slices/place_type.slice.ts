import { createSlice } from '@reduxjs/toolkit';
import { ITypePlace } from '../models';
import { fetchOnePlaceTypes } from '../thunks';
export interface InitialStateProps {
    isLoading: boolean;
    result: ITypePlace | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    result: null,
    error: null,
};

export const placeTypeSlice = createSlice({
    name: 'placeType',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOnePlaceTypes.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchOnePlaceTypes.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload.result,
            error: null,
        }));

        builder.addCase(fetchOnePlaceTypes.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
