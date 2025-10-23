import { createSlice } from '@reduxjs/toolkit';
import { fetchOneStundent } from '../thunks';
import { IStudent } from '../models';
export interface InitialStateProps {
    isLoading: boolean;
    result: IStudent | null;
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
            result: payload,
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
