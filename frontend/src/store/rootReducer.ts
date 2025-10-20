import { combineReducers } from "@reduxjs/toolkit";
import { notificationSlice } from "../common/notification";
import { meSlice } from "../features/auth/slices";
import { placesSlice } from "../features/places/slices";
import { placeSlice } from "../features/places/slices/place.slice";
import { periodSlice, periodsSlice } from "../features/periods/slices";
import { perservationSlice, perservationsSlice } from "../features/state-of-preservation/slices";
import { userSlice, usersSlice } from "../features/user/slices";
import { placeTypeSlice, placeTypesSlice } from "../features/type-of-place/slices";
import { studentSlice, studentsSlice } from "../features/students-list/slices";

export const rootReducer = combineReducers({
    me: meSlice.reducer,
    notification: notificationSlice.reducer,
    places: placesSlice.reducer,
    place: placeSlice.reducer,
    periods: periodsSlice.reducer,
    period: periodSlice.reducer,
    perservations: perservationsSlice.reducer,
    perservation: perservationSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer,
    place_type: placeTypeSlice.reducer,
    place_types: placeTypesSlice.reducer,
    students: studentsSlice.reducer,
    student: studentSlice.reducer,
})