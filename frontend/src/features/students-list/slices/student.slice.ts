import { createSlice } from '@reduxjs/toolkit';
import { IPlaceResive } from '../models';
import { fetchOneStundent } from '../thunks';
export interface InitialStateProps {
    isLoading: boolean;
    result: IPlaceResive | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    result: null,
    error: null,
};

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOneStundent.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchOneStundent.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload.result,
            error: null,
        }));

        builder.addCase(fetchOneStundent.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
