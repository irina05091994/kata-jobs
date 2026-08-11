import { useGetJobsQuery } from '../features/jobs/jobsApi';

interface UseJobsApiParams {
  page: number;
  search?: string;
  city?: string;
  skills?: string;
}

export function useJobsApi({ page, search, city, skills }: UseJobsApiParams) {
  const apiCity = city === 'Все города' ? undefined : city;
  
  const { data, isLoading, isFetching, isError, refetch } = useGetJobsQuery({
    page,
    search: search || undefined,
    city: apiCity,
    skills: skills && skills.length > 0 ? skills : undefined,
  });

  return {
    jobs: data?.jobs || [],
    totalPages: data?.pagination.totalPages || 1,
    isLoading,
    isFetching, 
    isError,
    refetch,
  };
}