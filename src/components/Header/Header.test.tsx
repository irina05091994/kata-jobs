import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import { Header } from './Header';

describe('Header', () => {
  it('рендерит логотип с текстом "hh" и ".FrontEnd"', () => {
    renderWithProviders(<Header />);
    
    expect(screen.getByText('hh')).toBeInTheDocument();
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('рендерит ссылку "Вакансии FE"', () => {
    renderWithProviders(<Header />);
    
    const link = screen.getByText('Вакансии FE');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/vacancies-fe');
  });

  it('рендерит ссылку "Обо мне" с иконкой', () => {
    renderWithProviders(<Header />);
    
    const link = screen.getByText('Обо мне');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/about');
  });

  it('логотип является ссылкой на главную', () => {
    renderWithProviders(<Header />);
    
    const logo = screen.getByText('.FrontEnd').closest('a');
    expect(logo).toHaveAttribute('href', '/');
  });
});