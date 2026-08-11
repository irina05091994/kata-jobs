import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_SKILLS = ['JavaScript', 'React', 'Redux', 'Python'];

export function useJobFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState(searchParams.get('city') || 'Все города');
  
  const skillsParam = searchParams.get('skills');
  const initialSkills = skillsParam ? skillsParam.split(',') : DEFAULT_SKILLS;
  const [skills, setSkills] = useState<string[]>(initialSkills);
  
  const pageParam = searchParams.get('page');
  const [page, setPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);


  useEffect(() => {
    const params = new URLSearchParams();
    
    if (search) params.set('search', search);
    if (city !== 'Все города') params.set('city', city);
    if (skills.length > 0) params.set('skills', skills.join(','));
    if (page > 1) params.set('page', String(page));

   
    setSearchParams(params, { replace: true });
  }, [search, city, skills, page, setSearchParams]);

 
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  const handleAddSkill = useCallback((skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setPage(1);
    }
  }, [skills]);

  const handleRemoveSkill = useCallback((skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
    setPage(1);
  }, []);

  const handleCityChange = useCallback((newCity: string) => {
    setCity(newCity);
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
    setPage,
  };
}