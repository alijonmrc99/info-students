import { createSlice } from '@reduxjs/toolkit';
import { ITeacher } from '../models';
import { fetchOneTeacher } from '../thunks';
export interface InitialStateProps {
    isLoading: boolean;
    result: ITeacher | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    result: null,
    error: null,
};

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOneTeacher.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchOneTeacher.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload,
            error: null,
        }));

        builder.addCase(fetchOneTeacher.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
