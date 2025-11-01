import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../models';
import { fetchOneUser } from '../thunks';
export interface InitialStateProps {
    isLoading: boolean;
    result: IUser | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    result: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null })
    },
    extraReducers: (builder) => {

        builder.addCase(fetchOneUser.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchOneUser.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: payload,
            error: null,
        }));

        builder.addCase(fetchOneUser.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
