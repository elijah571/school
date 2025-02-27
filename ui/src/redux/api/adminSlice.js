import { apiSlice } from "./apiSlice";
import { ADMIN_URL } from "../constant";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create an admin account
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/signup`, // Create admin via POST to '/signup'
        method: "POST",
        body: data,
      }),
    }),

    // Admin login
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`, // Admin login via POST to '/login'
        method: "POST",
        body: data,
      }),
    }),

    // Admin logout
    logoutAdmin: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`, // Admin logout via POST to '/logout'
        method: "POST",
      }),
    }),

    // Update admin profile
    updateAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/${data.id}`, // Update admin profile via PUT to '/:id'
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useUpdateAdminMutation,
} = adminApiSlice;
