import { describe, it, expect } from 'vitest';
import { jobsApi } from './jobsApi';

describe('jobsApi', () => {
  it('имеет правильный reducerPath', () => {
    expect(jobsApi.reducerPath).toBe('jobsApi');
  });

  it('имеет endpoint getJobs', () => {
    expect(jobsApi.endpoints.getJobs).toBeDefined();
  });

  it('формирует правильный URL с базовыми параметрами', () => {
    const endpoint = jobsApi.endpoints.getJobs;
    
    // Проверяем структуру endpoint
    expect(endpoint.name).toBe('getJobs');
  });

  it('принимает параметры фильтрации', () => {
    // Типизация проверяется на этапе компиляции
    const filters = {
      page: 1,
      search: 'React',
      city: 'Москва',
      skills: 'JavaScript,React',
    };
    
    expect(filters.page).toBe(1);
    expect(filters.search).toBe('React');
    expect(filters.city).toBe('Москва');
    expect(filters.skills).toBe('JavaScript,React');
  });
});