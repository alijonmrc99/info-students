import { createSlice } from '@reduxjs/toolkit';

import { IPost } from '../models';
import { fetchAllPosts } from '../thunks';


export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: IPost[] | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllPosts.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllPosts.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload,
            error: null,
        }));

        builder.addCase(fetchAllPosts.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
