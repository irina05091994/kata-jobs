export interface Job {
  id: number;
  name: string;
  company_name: string;
  city: string;
  salary: string;
  experience: string;
  space: 'office' | 'remote' | 'hybrid';
  skills: string;
  short_description?: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface JobsResponse {
  success: boolean;
  pagination: PaginationData;
  jobs: Job[];
}

export interface JobsFilters {
  page: number;
  search?: string;
  city?: string;
  skills?: string; // Строка через запятую для API
}