import { combineReducers } from "@reduxjs/toolkit";
import { notificationSlice } from "../common/notification";
import { meSlice } from "../features/auth/slices";
import { postSlice, postsSlice } from "../features/periods/slices";
import { userSlice, usersSlice } from "../features/user/slices";
import { studentSlice, studentsSlice } from "../features/students-list/slices";

export const rootReducer = combineReducers({
    me: meSlice.reducer,
    notification: notificationSlice.reducer,
    posts: postsSlice.reducer,
    post: postSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer,
    students: studentsSlice.reducer,
    student: studentSlice.reducer,
})