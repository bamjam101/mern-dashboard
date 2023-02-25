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
  }),
});

export const { useGetRegistrantQuery } = api;
export default api;
