import { createSlice } from "@reduxjs/toolkit";

export interface InitialStateProps {
    is_open: boolean,
    message: string,
    type?: 'success' | 'info' | 'warning' | 'error'
}

const initialState: InitialStateProps = {
    is_open: false,
    message: "",
    type: "warning"
}


export const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {
        open: (state, { payload }) => {
            console.log(payload);

            return ({ ...state, is_open: true, message: payload.message, type: payload.type })
        },
        close: (state) => ({ ...state, is_open: false })
    }
})