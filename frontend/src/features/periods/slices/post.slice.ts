import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../models';
import { fetchOnePost } from '../thunks';
export interface InitialStateProps {
    isLoading: boolean;
    result: IPost | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    result: null,
    error: null,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOnePost.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchOnePost.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload,
            error: null,
        }));

        builder.addCase(fetchOnePost.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
