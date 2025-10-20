import { createSlice } from '@reduxjs/toolkit';
import { IPreservation } from '../models';
import { fetchOnePreservation } from '../thunks';
export interface InitialStateProps {
    isLoading: boolean;
    result: IPreservation | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    result: null,
    error: null,
};

export const perservationSlice = createSlice({
    name: 'perservation',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOnePreservation.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchOnePreservation.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload.result,
            error: null,
        }));

        builder.addCase(fetchOnePreservation.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
