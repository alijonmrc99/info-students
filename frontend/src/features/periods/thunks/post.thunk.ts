import { createAsyncThunk } from '@reduxjs/toolkit';

import { ENDPOINT_POSTS } from '../endpoints';
import { IPost, IPosts } from '../models';
import { httpApi } from '../../../App';
import { ID } from '../../../common/models';



export const fetchAllPosts = createAsyncThunk('post/getAll', async (params: any, { rejectWithValue }) => {
    try {
        return await httpApi.get<IPosts>(ENDPOINT_POSTS, params).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchOnePost = createAsyncThunk('post/onePlace', async (id: ID, { rejectWithValue }) => {
    try {
        return await httpApi.get<IPost>(`${ENDPOINT_POSTS}/${id}`, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const onPost = createAsyncThunk('post/action',
    async (payload: { values: any, id?: any }, { rejectWithValue }) => {
        try {
            if (payload?.id)
                return httpApi.put(`${ENDPOINT_POSTS}/${payload.id}`, payload.values);
            else
                return httpApi.post(ENDPOINT_POSTS, payload.values);
        } catch (err) {
            return rejectWithValue(err)
        }
    })
