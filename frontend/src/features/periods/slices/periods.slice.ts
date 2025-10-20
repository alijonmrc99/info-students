import { createSlice } from '@reduxjs/toolkit';

import { IPeriod } from '../models';
import { fetchAllPeriods } from '../thunks';
import { IPageable } from '../../../common/models';


export interface InitialStatePropsPlaces {
    isLoading: boolean;
    result: IPeriod[] | null;
    error: any;
}

const initialState: InitialStatePropsPlaces = {
    isLoading: false,
    result: null,
    error: null,
};

export const periodsSlice = createSlice({
    name: 'periods',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, result: null }),
    },
    extraReducers: (builder) => {

        builder.addCase(fetchAllPeriods.pending, (state) => ({
            ...state,
            isLoading: true,
            result: null,
            error: null,
        }));

        builder.addCase(fetchAllPeriods.fulfilled, (state, { payload: { result } }) => ({
            ...state,
            isLoading: false,
            result: result,
            error: null,
        }));

        builder.addCase(fetchAllPeriods.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            result: null,
            error: payload,
        }));
    }
});
