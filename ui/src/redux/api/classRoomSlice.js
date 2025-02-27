import { apiSlice } from "./apiSlice";
import { CLASS_ROOM_URL } from "../constant";

export const classRoomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new classroom
    createClassroom: builder.mutation({
      query: (data) => ({
        url: `${CLASS_ROOM_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    // Assign teacher to a classroom
    assignTeacherToClassroom: builder.mutation({
      query: ({ classroomId, teacherId }) => ({
        url: `${CLASS_ROOM_URL}/assign-teacher/${classroomId}`,
        method: "POST",
        // Send teacherIds as an array
        body: { teacherIds: [teacherId] },
      }),
    }),
    
    // Assign students to a classroom (unchanged)
    assignStudentsToClassroom: builder.mutation({
      query: ({ classroomId, studentIds }) => ({
        url: `${CLASS_ROOM_URL}/assign-students/${classroomId}`,
        method: "POST",
        body: { studentIds },
      }),
    }),

    // Other endpoints...
    getAllClassrooms: builder.query({
      query: () => ({
        url: `${CLASS_ROOM_URL}/`,
      }),
      providesTags: ["Classroom"],
      keepUnusedDataFor: 5,
    }),

    getClassroom: builder.query({
      query: (classroomId) => ({
        url: `${CLASS_ROOM_URL}/${classroomId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateClassroomMutation,
  useAssignTeacherToClassroomMutation,
  useAssignStudentsToClassroomMutation,
  useGetAllClassroomsQuery,
  useGetClassroomQuery,
} = classRoomApiSlice;
