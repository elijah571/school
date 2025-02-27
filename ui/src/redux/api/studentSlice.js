import { apiSlice } from "../api/apiSlice";
import { STUDENTS_URL } from "../constant";

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/enroll`, // Matches the '/enroll' route
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query({
      query: () => ({
        url: STUDENTS_URL,
      }),
      providesTags: ["Student"],
      keepUnusedDataFor: 5,
    }),
    getStudentById: builder.query({
      query: (id) => ({
        url: `${STUDENTS_URL}/${id}`, // Get student by ID
      }),
      keepUnusedDataFor: 5,
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/${data._id}`, // Use _id for update
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (_id) => ({
        url: `${STUDENTS_URL}/${_id}`, // Use _id for delete
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApiSlice;
