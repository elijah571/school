import { apiSlice } from "./apiSlice";
import { ATTENDANCE_URL } from "../constant";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mark attendance for a classroom
    markAttendance: builder.mutation({
      query: ({ classroomId, attendanceStatus }) => ({
        url: `${ATTENDANCE_URL}/${classroomId}/mark-attendance`, // Endpoint to mark attendance
        method: "POST",
        body: { attendanceStatus }, // Pass attendanceStatus array
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Get attendance for a classroom
    getAttendanceForClassroom: builder.query({
      query: (classroomId) => ({
        url: `${ATTENDANCE_URL}/${classroomId}`, // Fetch attendance
      }),
      providesTags: ["Attendance"],
      keepUnusedDataFor: 5,
    }),

    // Get a specific student's attendance
    getStudentAttendance: builder.query({
      query: ({ classroomId, studentId }) => ({
        url: `${ATTENDANCE_URL}/${classroomId}/${studentId}`, // Fetch student attendance
      }),
      keepUnusedDataFor: 5,
    }),

    // Update attendance
    updateAttendance: builder.mutation({
      query: ({ attendanceId, attendanceStatus }) => ({
        url: `${ATTENDANCE_URL}/${attendanceId}`, // Update attendance by ID
        method: "PUT",
        body: { attendanceStatus },
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Delete attendance for a classroom
    deleteAttendance: builder.mutation({
      query: (classroomId) => ({
        url: `${ATTENDANCE_URL}/${classroomId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useMarkAttendanceMutation,
  useGetAttendanceForClassroomQuery,
  useGetStudentAttendanceQuery,
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApiSlice;
