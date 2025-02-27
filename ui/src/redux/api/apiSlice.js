import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

// Base Query with Credentials
const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  credentials: "include", // Move credentials here
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Teacher", "Student", "Attendance", "Report", "Classroom"],
  endpoints: () => ({}),
});
