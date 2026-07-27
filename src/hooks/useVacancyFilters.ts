import { useState, useCallback } from 'react';

const DEFAULT_SKILLS = ['JavaScript', 'React', 'Redux', 'Python'];

export interface VacancyFilters {
  search: string;
  searchInput: string;
  city: string;
  skills: string[];
  page: number;
}

export function useVacancyFilters() {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [city, setCity] = useState('Все города');
  const [skills, setSkills] = useState<string[]>(DEFAULT_SKILLS);
  const [page, setPage] = useState(1);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  const handleAddSkill = useCallback((skill: string) => {
    setSkills((prev) => [...prev, skill]);
    setPage(1);
  }, []);

  const handleRemoveSkill = useCallback((skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
    setPage(1);
  }, []);

  const handleCityChange = useCallback((newCity: string) => {
    setCity(newCity);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const resetFilters = useCallback(() => {
    setSearch('');
    setSearchInput('');
    setCity('Все города');
    setSkills(DEFAULT_SKILLS);
    setPage(1);
  }, []);

  return {
    search,
    searchInput,
    setSearchInput,
    city,
    skills,
    page,
    handleSearchSubmit,
    handleAddSkill,
    handleRemoveSkill,
    handleCityChange,
    handlePageChange,
    resetFilters,
  };
}