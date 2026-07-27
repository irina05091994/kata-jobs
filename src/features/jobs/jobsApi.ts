import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { JobsResponse, JobsFilters } from '../../types';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kata-jobs.onrender.com/api' }),
  endpoints: (builder) => ({
    getJobs: builder.query<JobsResponse, JobsFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        params.append('page', String(filters.page));
        params.append('per_page', '10'); // Явное требование: 10 элементов
        
        if (filters.search) params.append('search', filters.search);
        if (filters.city && filters.city !== 'Все') params.append('city', filters.city);
        if (filters.skills) params.append('skills', filters.skills);

        return `/jobs?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;