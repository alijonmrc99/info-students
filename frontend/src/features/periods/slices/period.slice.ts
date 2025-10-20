import { createSlice } from '@reduxjs/toolkit';
import { IPeriod } from '../models';
import { fetchOnePeriod } from '../thunks';
export interface InitialStateProps {
    isLoading: boolean;
    result: IPeriod | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    result: null,
    error: null,
};

export const periodSlice = createSlice({
    name: 'period',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOnePeriod.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchOnePeriod.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload.result,
            error: null,
        }));

        builder.addCase(fetchOnePeriod.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
