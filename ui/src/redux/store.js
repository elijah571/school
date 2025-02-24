import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import { teacherApiSlice } from './api/teacherSlice';
import { studentApiSlice } from './api/studentSlice';
import { attendanceApiSlice } from './api/attendanceSlice';
import { reportApiSlice } from './api/reportSlice';
import { classRoomApiSlice } from './api/classRoomSlice';
import { adminApiSlice } from './api/adminSlice';
import { uploadApiSlice } from './api/uploadSlice';

// Configure the store with the reducers and api slices
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // API reducer (generic slice for all API calls)
    [teacherApiSlice.reducerPath]: teacherApiSlice.reducer, 
    [studentApiSlice.reducerPath]: studentApiSlice.reducer, 
    [attendanceApiSlice.reducerPath]: attendanceApiSlice.reducer, 
    [reportApiSlice.reducerPath]: reportApiSlice.reducer, 
    [classRoomApiSlice.reducerPath]: classRoomApiSlice.reducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    [uploadApiSlice.reducerPath]: uploadApiSlice.reducer, // Include uploadApiSlice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware, 
      teacherApiSlice.middleware, 
      studentApiSlice.middleware, 
      attendanceApiSlice.middleware, 
      reportApiSlice.middleware, 
      classRoomApiSlice.middleware, 
      adminApiSlice.middleware, 
      uploadApiSlice.middleware 
    ),
});
