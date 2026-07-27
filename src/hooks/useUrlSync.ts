import { useEffect } from 'react';

interface UrlSyncParams {
  page: number;
  search: string;
  city: string;
  skills: string[];
}

export function useUrlSync({ page, search, city, skills }: UrlSyncParams) {
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (page > 1) params.set('page', String(page));
    if (search) params.set('search', search);
    if (city !== 'Все города') params.set('city', city);
    if (skills.length > 0) params.set('skills', skills.join(','));

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [page, search, city, skills]);
}