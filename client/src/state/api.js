import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: processResult.env.APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Registrant"],
  endpoints: (build) => ({
    getRegistrant: build.query({
      query: (id) => `/api/registrant/all`,
      providesTags: ["Registrant"],
    }),
  }),
});

export const { useGetRegistrantQuery } = api;
