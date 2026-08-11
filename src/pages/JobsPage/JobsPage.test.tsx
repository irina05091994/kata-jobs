import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { JobsPage } from './JobsPage';


vi.mock('../../hooks/useJobsApi', () => ({
  useJobsApi: vi.fn(),
}));

vi.mock('../../hooks/useUrlSync', () => ({
  useUrlSync: vi.fn(),
}));

import { useJobsApi } from '../../hooks/useJobsApi';
const mockUseJobsApi = vi.mocked(useJobsApi);

describe('JobsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
   
    mockUseJobsApi.mockReturnValue({
      jobs: [
        {
          id: 1,
          name: 'Frontend разработчик',
          company_name: 'Kata Academy',
          city: 'Москва',
          salary: '170 000',
          experience: '1-3 года',
          space: 'remote',
          skills: 'JavaScript,React',
        },
      ],
      totalPages: 2,
      isLoading: false,
      isFetching: false, 
      isError: false,
      refetch: vi.fn(),
    });
  });

  it('отображает заголовок страницы', () => {
    renderWithProviders(<JobsPage />);
    
    expect(screen.getByText('Список вакансий')).toBeInTheDocument();
    expect(screen.getByText('по профессии Frontend-разработчик')).toBeInTheDocument();
  });

  it('отображает поле поиска', () => {
    renderWithProviders(<JobsPage />);
    
    expect(
      screen.getByPlaceholderText('Должность или название компании')
    ).toBeInTheDocument();
  });

  it('отображает кнопку "Найти"', () => {
    renderWithProviders(<JobsPage />);
    
    expect(screen.getByRole('button', { name: 'Найти' })).toBeInTheDocument();
  });

  it('отображает фильтр навыков', () => {
    renderWithProviders(<JobsPage />);
    
    expect(screen.getByText('Ключевые навыки')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('отображает вакансии после загрузки', () => {
    renderWithProviders(<JobsPage />);
    
    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
    expect(screen.getByText('Kata Academy')).toBeInTheDocument();
  });

  it('отображает сообщение об отсутствии вакансий', () => {

    mockUseJobsApi.mockReturnValue({
      jobs: [],
      totalPages: 0,
      isLoading: false,
      isFetching: false, // <-- И здесь
      isError: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<JobsPage />);
    
    expect(screen.getByText('Вакансии не найдены')).toBeInTheDocument();
  });

  it('отображает пагинацию', () => {
    renderWithProviders(<JobsPage />);
    
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  });
});