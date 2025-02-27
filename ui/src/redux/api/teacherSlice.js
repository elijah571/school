import { apiSlice } from "../api/apiSlice";
import { TEACHERS_URL } from "../constant";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/login`,
        method: "POST",
        body: data,
        //credentials: "include",  // This ensures cookies are sent with the request
      }),
    }),
    registerTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/create`,
        method: "POST",
        body: data,
        // credentials: "include",  // This ensures cookies are sent with the request
      }),
    }),
    logoutTeacher: builder.mutation({
      query: () => ({
        url: `${TEACHERS_URL}/logout`,
        method: "POST",
        // credentials: "include",  // This ensures cookies are sent with the request
      }),
    }),
    getTeachers: builder.query({
      query: () => ({
        url: `${TEACHERS_URL}`,
        credentials: "include",  // This ensures cookies are sent with the request
      }),
      providesTags: ["Teacher"],
      keepUnusedDataFor: 5,
    }),
    deleteTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`,
        method: "DELETE",
        // credentials: "include",  // This ensures cookies are sent with the request
      }),
      invalidatesTags: ["Teacher"], // Ensure this invalidates the "Teacher" cache tag
    }),
    getTeacherDetails: builder.query({
      query: (id) => ({
        url: `${TEACHERS_URL}/${id}`,
        credentials: "include",  // This ensures cookies are sent with the request
      }),
      keepUnusedDataFor: 5,
    }),
    updateTeacher: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TEACHERS_URL}/${id}`,
        method: "PUT",
        body: data,
        // credentials: "include",  // This ensures cookies are sent with the request
      }),
      invalidatesTags: ["Teacher"], // Invalidate the teacher list cache after update
    }),
  }),
});

export const {
  useLoginTeacherMutation,
  useLogoutTeacherMutation,
  useRegisterTeacherMutation,
  useGetTeachersQuery,
  useDeleteTeacherMutation,
  useGetTeacherDetailsQuery,
  useUpdateTeacherMutation,
} = teacherApiSlice;
