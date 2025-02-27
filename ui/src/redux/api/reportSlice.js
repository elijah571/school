import { apiSlice } from "./apiSlice";
import { REPORT_URL } from "../constant";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new report
    createReport: builder.mutation({
      query: (data) => ({
        url: `${REPORT_URL}/`, // Post to the root of the report URL
        method: "POST",
        body: data,
      }),
    }),

    // Get all reports
    getAllReports: builder.query({
      query: () => ({
        url: `${REPORT_URL}/`, // Get all reports
      }),
      providesTags: ["Report"],
      keepUnusedDataFor: 5,
    }),

    // Get a specific student's report by ID
    getStudentReportById: builder.query({
      query: (studentId) => ({
        url: `${REPORT_URL}/${studentId}`, // Get the report of a specific student by ID
      }),
      keepUnusedDataFor: 5,
    }),

    // Update all reports
    updateAllReports: builder.mutation({
      query: (data) => ({
        url: `${REPORT_URL}/`, // Update all reports
        method: "PUT",
        body: data,
      }),
    }),

    // Update a specific student's report
    updateStudentReport: builder.mutation({
      query: (data) => ({
        url: `${REPORT_URL}/${data.studentId}`, // Update a student's report by their ID
        method: "PUT",
        body: data,
      }),
    }),

    // Delete all reports
    deleteAllReports: builder.mutation({
      query: () => ({
        url: `${REPORT_URL}/`, // Delete all reports
        method: "DELETE",
      }),
      invalidatesTags: ["Report"],
    }),

    // Delete a specific student's report
    deleteStudentReport: builder.mutation({
      query: (studentId) => ({
        url: `${REPORT_URL}/${studentId}`, // Delete a report by studentId
        method: "DELETE",
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const {
  useCreateReportMutation,
  useGetAllReportsQuery,
  useGetStudentReportByIdQuery,
  useUpdateAllReportsMutation,
  useUpdateStudentReportMutation,
  useDeleteAllReportsMutation,
  useDeleteStudentReportMutation,
} = reportApiSlice;
