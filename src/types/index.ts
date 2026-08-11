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
  description?: string;      
  about_company?: string;   
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;    
  hasPrevPage: boolean;
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
  skills?: string; 
}