import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Registrant"],
  endpoints: (build) => ({
    getRegistrant: build.query({
      query: () => `/registrant/all`,
      providesTags: ["Registrant"],
    }),
    addNewRegistrant: build.mutation({
      query: (payload) => ({
        url: `/registrant/signup`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        invalidatesTags: ["Post"],
      }),
    }),
  }),
});

export const { useGetRegistrantQuery, useAddNewRegistrantMutation } = api;
export default api;
